import { attraction } from '../config';

/* ------------------------------------------------------------------
 * 气象与海况数据服务层
 * 全部在服务器端（Astro Server Component / Cloudflare Worker）抓取并缓存，
 * 浏览器端不会直接请求任何第三方服务，也不会暴露数据来源与接口细节。
 * ------------------------------------------------------------------ */

export type SkyKey =
  | 'clear'
  | 'mostlyClear'
  | 'partlyCloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavyRain'
  | 'showers'
  | 'thunder'
  | 'snow';

export interface SkyInfo {
  key: SkyKey;
  icon: 'sun' | 'sun-cloud' | 'cloud' | 'fog' | 'drizzle' | 'rain' | 'heavy-rain' | 'storm' | 'snow';
  night: boolean;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
  windGusts: number;
  windDirection: number;
  uvIndex: number;
  cloudCover: number;
  /** 能见度（公里） */
  visibility: number;
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
  uvIndex: number;
  windSpeed: number;
  windGusts: number;
  /** 能见度（公里） */
  visibility: number;
}

export interface DailyWeather {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  apparentTemperatureMax: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationSum: number;
  precipitationProbability: number;
  /** 有降水的小时数，用于判断"全天湿哒哒"还是"短时阵雨" */
  precipitationHours: number;
  windSpeedMax: number;
  windGustsMax: number;
}

export interface WeatherBundle {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  timezone: string;
  /** Open-Meteo utc_offset_seconds for the requested timezone (Asia/Bangkok = 25200). */
  utcOffsetSeconds: number;
  fetchedAt: string;
}

export interface TideEvent {
  type: 'high' | 'low';
  time: string;
}

export interface MarineBundle {
  /** 有效浪高（米） */
  waveHeight: number;
  /** 浪周期（秒） */
  wavePeriod: number;
  /** 浪向（度） */
  waveDirection: number;
  /** 海表温度（摄氏度） */
  seaTemperature: number;
  /** 未来 24 小时内的涨落潮时刻 */
  tides: TideEvent[];
  fetchedAt: string;
}

const TTL_MS = 30 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 6000;
const CACHE_SECONDS = 1800;

let memory: { at: number; data: WeatherBundle } | null = null;
let marineMemory: { at: number; data: MarineBundle } | null = null;

/** WMO 天气代码 → 语义键 + 图标类型 */
export function skyInfo(code: number, isDay = true): SkyInfo {
  const night = !isDay;
  const pick = (key: SkyKey, icon: SkyInfo['icon']): SkyInfo => ({ key, icon, night });
  if (code === 0) return pick('clear', night ? 'sun' : 'sun');
  if (code === 1) return pick('mostlyClear', night ? 'sun' : 'sun-cloud');
  if (code === 2) return pick('partlyCloudy', 'sun-cloud');
  if (code === 3) return pick('overcast', 'cloud');
  if (code === 45 || code === 48) return pick('fog', 'fog');
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return pick('drizzle', 'drizzle');
  if (code === 61 || code === 63) return pick('rain', 'rain');
  if (code === 65 || code === 66 || code === 67) return pick('heavyRain', 'heavy-rain');
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return pick('snow', 'snow');
  if (code === 80 || code === 81 || code === 82) return pick('showers', 'rain');
  if (code === 95 || code === 96 || code === 99) return pick('thunder', 'storm');
  return pick('partlyCloudy', 'sun-cloud');
}

/** 是否属于强降雨代码（含雨中夹雪等极端类型） */
export function isThunder(code: number): boolean {
  return code === 95 || code === 96 || code === 99;
}
export function isHeavyRain(code: number): boolean {
  return code === 65 || code === 66 || code === 67 || code === 82;
}
export function isRainy(code: number): boolean {
  return code >= 51 && code <= 67;
}
export function isDrizzle(code: number): boolean {
  return code >= 51 && code <= 57;
}
export function isStormySky(code: number): boolean {
  return isThunder(code) || isHeavyRain(code);
}

/** 方位角 → 罗盘缩写 */
export function windCompass(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(((deg % 360) / 22.5)) % 16];
}

/** 风速（km/h）→ 蒲福风级，用于把数字翻译成"几级风" */
export function beaufort(speedKmh: number): number {
  const limits = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117];
  for (let i = 0; i < limits.length; i++) {
    if (speedKmh < limits[i]) return i;
  }
  return 12;
}

/** 未来 N 小时的极值统计：把逐小时数据压缩成"接下来会不会变差" */
export function outlook(hourly: HourlyWeather[], hours = 6) {
  const slice = hourly.slice(0, hours);
  const max = (fn: (h: HourlyWeather) => number) => (slice.length ? Math.max(...slice.map(fn)) : 0);
  const min = (fn: (h: HourlyWeather) => number) =>
    slice.length ? Math.min(...slice.map(fn)) : Number.POSITIVE_INFINITY;
  return {
    count: slice.length,
    maxPrecipProbability: max((h) => h.precipitationProbability),
    rainTotal: slice.reduce((sum, h) => sum + h.precipitation, 0),
    maxGusts: max((h) => h.windGusts),
    maxWind: max((h) => h.windSpeed),
    minVisibility: min((h) => h.visibility),
    maxUv: max((h) => h.uvIndex),
    hasThunder: slice.some((h) => isThunder(h.weatherCode)),
    hasHeavyRain: slice.some((h) => isHeavyRain(h.weatherCode)),
  };
}

/* ------------------------------------------------------------------
 * 数据抓取
 * ------------------------------------------------------------------ */

function num(v: unknown, fallback = 0): number {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}
const round1 = (v: number) => Math.round(v * 10) / 10;

async function getJson(url: URL): Promise<any | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
      /* 边缘缓存：同一份数据 30 分钟内直接命中 CDN 缓存 */
      cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
    } as unknown as RequestInit);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function requestWeather(): Promise<WeatherBundle | null> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(attraction.latitude));
  url.searchParams.set('longitude', String(attraction.longitude));
  url.searchParams.set(
    'current',
    [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'cloud_cover',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(',')
  );
  url.searchParams.set(
    'hourly',
    [
      'temperature_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'is_day',
      'uv_index',
      'wind_speed_10m',
      'wind_gusts_10m',
      'visibility',
    ].join(',')
  );
  url.searchParams.set(
    'daily',
    [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
      'precipitation_hours',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
    ].join(',')
  );
  url.searchParams.set('timezone', 'Asia/Bangkok');
  url.searchParams.set('forecast_days', '7');

  const raw = await getJson(url);
  return raw ? normalizeWeather(raw) : null;
}

async function requestMarine(): Promise<MarineBundle | null> {
  const coast = attraction.nearbyCoast;
  if (!coast) return null;

  const url = new URL('https://marine-api.open-meteo.com/v1/marine');
  url.searchParams.set('latitude', String(coast.latitude));
  url.searchParams.set('longitude', String(coast.longitude));
  url.searchParams.set('current', 'wave_height,wave_direction,wave_period,sea_surface_temperature');
  url.searchParams.set('hourly', 'sea_level_height_msl');
  url.searchParams.set('timezone', 'Asia/Bangkok');
  url.searchParams.set('forecast_days', '2');

  const raw = await getJson(url);
  return raw ? normalizeMarine(raw) : null;
}

/* ------------------------------------------------------------------
 * 数据规整
 * ------------------------------------------------------------------ */

function normalizeWeather(raw: any): WeatherBundle {
  const c = raw?.current ?? {};
  const h = raw?.hourly ?? {};
  const d = raw?.daily ?? {};

  const times: string[] = Array.isArray(h.time) ? h.time : [];
  const nowMs = Date.parse(String(c.time ?? '') || new Date().toISOString());

  const current: CurrentWeather = {
    time: String(c.time ?? ''),
    temperature: Math.round(num(c.temperature_2m)),
    apparentTemperature: Math.round(num(c.apparent_temperature)),
    humidity: Math.round(num(c.relative_humidity_2m)),
    precipitation: round1(num(c.precipitation)),
    weatherCode: num(c.weather_code),
    isDay: num(c.is_day, 1) === 1,
    windSpeed: Math.round(num(c.wind_speed_10m)),
    windGusts: Math.round(num(c.wind_gusts_10m)),
    windDirection: num(c.wind_direction_10m),
    uvIndex: 0,
    cloudCover: Math.round(num(c.cloud_cover)),
    visibility: 10,
  };

  // 找出与"此刻"最接近的小时索引，用于取当前紫外线与能见度
  let nearest = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < times.length; i++) {
    const diff = Math.abs(Date.parse(times[i]) - nowMs);
    if (diff < bestDiff) {
      bestDiff = diff;
      nearest = i;
    }
  }
  current.uvIndex = round1(num((h.uv_index ?? [])[nearest]));
  const visNow = num((h.visibility ?? [])[nearest], 10000);
  current.visibility = round1(visNow / 1000);

  const hourly: HourlyWeather[] = [];
  for (let i = 0; i < times.length; i++) {
    const t = Date.parse(times[i]);
    if (!Number.isFinite(t) || t < nowMs - 30 * 60 * 1000) continue;
    hourly.push({
      time: times[i],
      temperature: Math.round(num((h.temperature_2m ?? [])[i])),
      apparentTemperature: Math.round(num((h.apparent_temperature ?? [])[i])),
      precipitationProbability: Math.round(num((h.precipitation_probability ?? [])[i])),
      precipitation: round1(num((h.precipitation ?? [])[i])),
      weatherCode: num((h.weather_code ?? [])[i]),
      isDay: num((h.is_day ?? [])[i], 1) === 1,
      uvIndex: round1(num((h.uv_index ?? [])[i])),
      windSpeed: Math.round(num((h.wind_speed_10m ?? [])[i])),
      windGusts: Math.round(num((h.wind_gusts_10m ?? [])[i])),
      visibility: round1(num((h.visibility ?? [])[i], 10000) / 1000),
    });
    if (hourly.length >= 12) break;
  }

  const dates: string[] = Array.isArray(d.time) ? d.time : [];
  const daily: DailyWeather[] = dates.map((date, i) => ({
    date,
    weatherCode: num((d.weather_code ?? [])[i]),
    tempMax: Math.round(num((d.temperature_2m_max ?? [])[i])),
    tempMin: Math.round(num((d.temperature_2m_min ?? [])[i])),
    apparentTemperatureMax: Math.round(num((d.apparent_temperature_max ?? [])[i])),
    sunrise: String((d.sunrise ?? [])[i] ?? ''),
    sunset: String((d.sunset ?? [])[i] ?? ''),
    uvIndexMax: round1(num((d.uv_index_max ?? [])[i])),
    precipitationSum: round1(num((d.precipitation_sum ?? [])[i])),
    precipitationProbability: Math.round(num((d.precipitation_probability_max ?? [])[i])),
    precipitationHours: Math.round(num((d.precipitation_hours ?? [])[i])),
    windSpeedMax: Math.round(num((d.wind_speed_10m_max ?? [])[i])),
    windGustsMax: Math.round(num((d.wind_gusts_10m_max ?? [])[i])),
  }));

  return {
    current,
    hourly,
    daily,
    timezone: String(raw?.timezone ?? 'Asia/Bangkok'),
    /* 关键：Open-Meteo 在指定 timezone 后返回的是该时区的"墙钟时间"（无时区后缀）。
       utc_offset_seconds 让前端用正确的偏移来解析，避免构建机时区不同导致 sunrise/sunset
       被错误平移（例如本应 06:12 显示成 13:12）。 */
    utcOffsetSeconds: num(raw?.utc_offset_seconds, 25200),
    fetchedAt: new Date().toISOString(),
  };
}

/** 从潮位序列中提取未来 24 小时内的涨落潮极值 */
function findTides(times: string[], levels: number[]): TideEvent[] {
  const now = Date.now();
  const limit = now + 24 * 60 * 60 * 1000;
  const events: TideEvent[] = [];
  for (let i = 1; i < levels.length - 1; i++) {
    const t = Date.parse(times[i]);
    if (!Number.isFinite(t) || t < now || t > limit) continue;
    const prev = levels[i - 1];
    const next = levels[i + 1];
    if (levels[i] > prev && levels[i] >= next) events.push({ type: 'high', time: times[i] });
    else if (levels[i] < prev && levels[i] <= next) events.push({ type: 'low', time: times[i] });
    if (events.length >= 6) break;
  }
  return events;
}

function normalizeMarine(raw: any): MarineBundle {
  const c = raw?.current ?? {};
  const times: string[] = Array.isArray(raw?.hourly?.time) ? raw.hourly.time : [];
  const levels: number[] = (raw?.hourly?.sea_level_height_msl ?? []).map((v: unknown) => num(v, NaN));
  const validLevels = levels.filter((v: number) => Number.isFinite(v));

  return {
    waveHeight: round1(num(c.wave_height)),
    wavePeriod: round1(num(c.wave_period)),
    waveDirection: num(c.wave_direction),
    seaTemperature: Math.round(num(c.sea_surface_temperature)),
    tides: validLevels.length > 2 ? findTides(times, levels) : [],
    fetchedAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------
 * 对外的读取入口
 * 两级缓存：边缘缓存（Cloudflare Cache API，跨实例共享）+ 进程内缓存，
 * 上游失败时回退到上一次成功结果，尽量不让页面上出现空洞。
 * ------------------------------------------------------------------ */

interface CacheStorageLike {
  match(key: string): Promise<Response | undefined>;
  put(key: string, res: Response): Promise<void>;
}

const edgeCache = (globalThis as unknown as { caches?: { default?: CacheStorageLike } }).caches?.default;
const CACHE_ORIGIN = 'https://cache.internal/wat-tham-suea';

async function readEdge<T>(key: string): Promise<{ at: number; data: T } | null> {
  if (!edgeCache) return null;
  try {
    const hit = await edgeCache.match(key);
    if (!hit) return null;
    const at = Number(hit.headers.get('x-stored-at') ?? 0);
    if (!at || Date.now() - at > TTL_MS) return null;
    return { at, data: (await hit.json()) as T };
  } catch {
    return null;
  }
}

async function writeEdge(key: string, data: unknown, at: number): Promise<void> {
  if (!edgeCache) return;
  try {
    await edgeCache.put(
      key,
      new Response(JSON.stringify(data), {
        headers: {
          'content-type': 'application/json',
          'x-stored-at': String(at),
          'cache-control': `max-age=${CACHE_SECONDS}`,
        },
      })
    );
  } catch {
    /* 缓存写入失败不应影响页面渲染 */
  }
}

async function loadCached<T>(
  key: string,
  readMemory: () => { at: number; data: T } | null,
  writeMemory: (value: { at: number; data: T }) => void,
  fetcher: () => Promise<T | null>
): Promise<T | null> {
  const cached = readMemory();
  if (cached && Date.now() - cached.at < TTL_MS) return cached.data;

  const fromEdge = await readEdge<T>(key);
  if (fromEdge) {
    writeMemory(fromEdge);
    return fromEdge.data;
  }

  const fresh = await fetcher();
  if (fresh) {
    const entry = { at: Date.now(), data: fresh };
    writeMemory(entry);
    await writeEdge(key, fresh, entry.at);
    return fresh;
  }
  return cached?.data ?? null;
}

export function getWeather(): Promise<WeatherBundle | null> {
  return loadCached<WeatherBundle>(
    `${CACHE_ORIGIN}/weather`,
    () => memory,
    (value) => {
      memory = value;
    },
    requestWeather
  );
}

/** 近海海况：与天气共用缓存策略；任何失败都静默降级为 null，前端隐藏该卡片 */
export function getMarine(): Promise<MarineBundle | null> {
  return loadCached<MarineBundle>(
    `${CACHE_ORIGIN}/marine`,
    () => marineMemory,
    (value) => {
      marineMemory = value;
    },
    requestMarine
  );
}
