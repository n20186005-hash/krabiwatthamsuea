import {
  beaufort,
  isDrizzle,
  isHeavyRain,
  isStormySky,
  isThunder,
  outlook,
  type MarineBundle,
  type WeatherBundle,
} from './weather';

/* ------------------------------------------------------------------
 * 面向游客的出行建议引擎
 * ------------------------------------------------------------------
 * 设计原则：
 * 1) 不输出气象术语，只输出"我现在该干嘛"；
 * 2) 条件不满足的建议直接不渲染，宁可少说也不堆砌；
 * 3) 风险提醒优先级最高，一旦命中就把普通建议降级；
 * 4) 结合景区地理环境（山地 / 溶洞 / 森林 / 近海）给出场景化提示。
 * ------------------------------------------------------------------ */

export type Tone = 'ok' | 'info' | 'warn' | 'danger';

export interface AdviceItem {
  tone: Tone;
  icon: string;
  text: string;
  /** 随身物品类条目的名称（短标签） */
  label?: string;
  /** 所属分组：景区本体环境 / 顺游海滨 */
  group?: 'site' | 'coast';
}

export interface AdviceMetrics {
  /** 未来数小时内的最高降水概率 */
  pop: number;
  beaufort: number;
  windLevel: 'calm' | 'light' | 'breezy' | 'strong';
  uvLevel: 'low' | 'moderate' | 'high' | 'veryHigh';
  visibility: number;
}

export interface BestWindow {
  start: string;
  end: string;
}

export interface AdviceResult {
  tone: Tone;
  verdict: string;
  /** 当前蒲福风级，用于把风速翻译成"几级风" */
  beaufort: number;
  metrics: AdviceMetrics;
  alerts: AdviceItem[];
  outfit: AdviceItem[];
  plan: AdviceItem[];
  gear: AdviceItem[];
  scenes: AdviceItem[];
  window: BestWindow | null;
}

export interface AdviceInput {
  data: WeatherBundle;
  marine: MarineBundle | null;
  /** messages.weather */
  w: Record<string, any>;
  environments: readonly string[];
  locale: string;
}

const TONE_RANK: Record<Tone, number> = { ok: 0, info: 1, warn: 2, danger: 3 };

function worstTone(tones: Tone[]): Tone {
  return tones.reduce<Tone>((acc, t) => (TONE_RANK[t] > TONE_RANK[acc] ? t : acc), 'ok');
}

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? '');
}

function hourLabel(iso: string, locale: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return '--:--';
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Bangkok',
    }).format(t);
  } catch {
    return '--:--';
  }
}

/** 在接下来 12 小时里找一段"雨最少、也不太热"的连续 3 小时 */
function findWindow(data: WeatherBundle, locale: string): BestWindow | null {
  const hours = data.hourly;
  for (let i = 0; i + 2 < hours.length && i <= 9; i++) {
    const block = hours.slice(i, i + 3);
    const okTemp = Math.max(...block.map((h) => h.apparentTemperature)) <= 34;
    const okRain = Math.max(...block.map((h) => h.precipitationProbability)) <= 40;
    const okSky = !block.some((h) => isStormySky(h.weatherCode));
    const okSee = Math.min(...block.map((h) => h.visibility)) >= 3;
    if (okTemp && okRain && okSky && okSee) {
      return {
        start: hourLabel(block[0].time, locale),
        end: hourLabel(new Date(Date.parse(block[2].time) + 3600 * 1000).toISOString(), locale),
      };
    }
  }
  return null;
}

export function buildAdvice(input: AdviceInput): AdviceResult {
  const { data, marine, w, locale } = input;
  const envs = new Set<string>(input.environments as readonly string[]);
  const { current, daily } = data;
  const today = daily[0];
  const soon = outlook(data.hourly, 6);

  /* ---------------- 关键阈值（统一收口，便于调参） ---------------- */
  const feelsLike = Math.max(current.apparentTemperature, today?.apparentTemperatureMax ?? 0);
  const feelsNow = current.apparentTemperature;
  const pop = Math.max(current.precipitation > 0 ? 60 : 0, today?.precipitationProbability ?? 0, soon.maxPrecipProbability);
  const gusts = Math.max(current.windGusts, soon.maxGusts, today?.windGustsMax ?? 0);
  const wind = Math.max(current.windSpeed, soon.maxWind, today?.windSpeedMax ?? 0);
  const uvMax = Math.max(current.uvIndex, today?.uvIndexMax ?? 0);
  const visibility = Math.min(current.visibility, soon.minVisibility);
  const dayRange = today ? today.tempMax - today.tempMin : 0;
  const rainNow = current.precipitation > 0;
  const thunder = isThunder(current.weatherCode) || soon.hasThunder;
  const heavyRain = isHeavyRain(current.weatherCode) || soon.hasHeavyRain;
  const stormy = isStormySky(current.weatherCode);
  const wetSoon = rainNow || pop >= 60 || thunder || heavyRain;
  const beaufortNow = beaufort(Math.max(current.windSpeed, current.windGusts));

  const alerts: AdviceItem[] = [];
  const outfit: AdviceItem[] = [];
  const plan: AdviceItem[] = [];
  const gear: AdviceItem[] = [];
  const scenes: AdviceItem[] = [];

  const A = (w.alert ?? {}) as Record<string, { t: string; x: string }>;
  const alertItem = (key: string, tone: Tone, icon: string): AdviceItem | null =>
    A[key] ? { tone, icon, label: A[key].t, text: A[key].x } : null;

  /* ---------------- 一、风险提醒（优先级最高） ---------------- */
  if (thunder) {
    const item = alertItem('thunder', 'danger', 'storm');
    if (item) alerts.push(item);
  } else if (heavyRain || soon.rainTotal >= 15 || (today?.precipitationSum ?? 0) >= 30) {
    const item = alertItem('heavyRain', 'danger', 'rain');
    if (item) alerts.push(item);
  }
  if (gusts >= 50) {
    const item = alertItem('wind', 'danger', 'wind');
    if (item) alerts.push(item);
  }
  if (visibility < 1) {
    const item = alertItem('fog', 'danger', 'fog');
    if (item) alerts.push(item);
  }
  if (feelsLike >= 38) {
    const item = alertItem('heat', 'danger', 'thermometer');
    if (item) alerts.push(item);
  } else if (feelsLike >= 35) {
    const item = alertItem('heatWatch', 'warn', 'thermometer');
    if (item) alerts.push(item);
  }
  if (today && today.tempMax <= 10) {
    const item = alertItem('cold', 'danger', 'cold');
    if (item) alerts.push(item);
  }

  /* ---------------- 二、出行穿搭 ---------------- */
  const O = (w.outfit ?? {}) as Record<string, string>;
  if (feelsLike >= 32) outfit.push({ tone: 'info', icon: 'sun', text: O.hot });
  else if (feelsLike >= 27) outfit.push({ tone: 'ok', icon: 'sun', text: O.warm });
  if (dayRange > 8) outfit.push({ tone: 'info', icon: 'thermometer', text: O.tempSwing });
  if (today && today.tempMin <= 20) outfit.push({ tone: 'info', icon: 'cold', text: O.cool });
  if (wetSoon) outfit.push({ tone: 'warn', icon: 'rain', text: O.wet });
  if (current.humidity >= 85 && feelsNow >= 27) outfit.push({ tone: 'info', icon: 'wind', text: O.humid });
  if (wind >= 29) outfit.push({ tone: 'warn', icon: 'wind', text: O.windy });
  if (outfit.length === 0) outfit.push({ tone: 'ok', icon: 'check', text: O.default });

  /* ---------------- 三、游玩安排 ---------------- */
  const P = (w.plan ?? {}) as Record<string, string>;
  if (thunder) plan.push({ tone: 'danger', icon: 'storm', text: P.thunder });
  else if (heavyRain) plan.push({ tone: 'danger', icon: 'rain', text: P.heavyRain });
  else if (pop >= 60) plan.push({ tone: 'warn', icon: 'umbrella', text: P.rainLikely });
  else if (rainNow || isDrizzle(current.weatherCode) || soon.hasHeavyRain) plan.push({ tone: 'info', icon: 'drizzle', text: P.drizzle });

  if (feelsLike >= 35) plan.push({ tone: 'warn', icon: 'thermometer', text: P.hot });
  if (uvMax >= 8) plan.push({ tone: 'warn', icon: 'uv', text: P.uvHigh });
  if (visibility < 2) plan.push({ tone: 'warn', icon: 'fog', text: P.foggy });

  if (plan.length === 0) {
    if (current.weatherCode === 0 || current.weatherCode === 1) plan.push({ tone: 'ok', icon: 'sun', text: P.sunny });
    else if (current.weatherCode === 3) plan.push({ tone: 'ok', icon: 'cloud', text: P.overcast });
    else plan.push({ tone: 'ok', icon: 'check', text: P.good });
  }

  const window = findWindow(data, locale);
  if (window) {
    plan.push({
      tone: alerts.length || plan.some((p) => p.tone !== 'ok') ? 'info' : 'ok',
      icon: 'clock',
      text: fill(P.window ?? '', { start: window.start, end: window.end }),
    });
  } else if (pop >= 60) {
    plan.push({ tone: 'warn', icon: 'clock', text: P.windowNone });
  }

  /* ---------------- 四、随身物品（按需渲染） ---------------- */
  const G = (w.gear ?? {}) as Record<string, string>;
  const addGear = (icon: string, key: string) => {
    if (G[key]) gear.push({ tone: 'info', icon, label: G[key], text: G[key] });
  };
  if (thunder || heavyRain || gusts >= 50) addGear('raincoat', 'raincoat');
  else if (pop >= 60 || rainNow) addGear('umbrella', 'umbrella');
  if (envs.has('mountain') || envs.has('forest')) addGear('shoes', 'shoes');
  if (feelsLike >= 29) addGear('water', 'water');
  if (feelsLike >= 33 || (today?.precipitationHours ?? 0) >= 4) addGear('electrolyte', 'electrolyte');
  if (uvMax >= 5 || current.cloudCover < 50) addGear('sunscreen', 'sunscreen');
  if (uvMax >= 5) addGear('sunglasses', 'sunglasses');
  if (uvMax >= 6 || feelsLike >= 32) addGear('hat', 'hat');
  if (current.humidity >= 75 && feelsNow >= 28) addGear('towel', 'towel');
  if (envs.has('forest') || envs.has('cave') || (current.humidity >= 80 && feelsNow >= 26)) addGear('repellent', 'repellent');
  if (today && today.tempMin <= 20) addGear('jacket', 'jacket');
  if (envs.has('cave')) addGear('wipes', 'wipes');
  if (gear.length < 2) {
    addGear('water', 'water');
    addGear('sunscreen', 'sunscreen');
  }

  /* ---------------- 五、环境专项（按景区地理类型） ---------------- */
  const S = (w.scene ?? {}) as Record<string, string>;
  const site = (item: Omit<AdviceItem, 'group'>) => scenes.push({ ...item, group: 'site' });
  const coast = (item: Omit<AdviceItem, 'group'>) => scenes.push({ ...item, group: 'coast' });

  if (envs.has('mountain')) {
    if (thunder) site({ tone: 'danger', icon: 'storm', text: S.mountainStorm });
    else if (gusts >= 39) site({ tone: 'warn', icon: 'wind', text: S.mountainWind });
    else site({ tone: 'info', icon: 'mountain', text: S.mountainCalm });
    if (wetSoon) site({ tone: 'warn', icon: 'walk', text: S.mountainWet });
  }
  if (envs.has('cave')) {
    site({ tone: 'info', icon: 'cave', text: S.caveCool });
    if (current.humidity >= 80 || wetSoon) site({ tone: 'info', icon: 'drizzle', text: S.caveWet });
  }
  if (envs.has('forest')) {
    site({ tone: 'info', icon: 'repellent', text: S.forestRepel });
    if ((today?.precipitationSum ?? 0) >= 25 || soon.rainTotal >= 8) site({ tone: 'warn', icon: 'warning', text: S.forestSlick });
  }
  if (envs.has('water')) site({ tone: 'info', icon: 'wave', text: S.waterFlow });

  /* 顺游海滨：仅当配置了海滨参考点且海况数据可用时出现 */
  if (marine) {
    const high = marine.tides.find((t) => t.type === 'high');
    const low = marine.tides.find((t) => t.type === 'low');
    if (marine.waveHeight >= 1.5) {
      coast({ tone: 'warn', icon: 'wave', text: fill(S.coastAlert ?? '', { h: String(marine.waveHeight) }) });
    } else if (S.coastWave) {
      coast({ tone: 'info', icon: 'wave', text: fill(S.coastWave, { h: String(marine.waveHeight) }) });
    }
    if (S.coastTemp && marine.seaTemperature) {
      coast({ tone: 'info', icon: 'thermometer', text: fill(S.coastTemp, { t: String(marine.seaTemperature) }) });
    }
    if (S.coastTide && high) {
      coast({
        tone: 'info',
        icon: 'tide',
        text: fill(S.coastTide, {
          high: hourLabel(high.time, locale),
          low: low ? hourLabel(low.time, locale) : '—',
        }),
      });
    }
  }

  /* ---------------- 汇总 ---------------- */
  const tone = worstTone([
    ...alerts.map((a) => a.tone),
    ...plan.map((p) => p.tone),
    ...outfit.map((o) => o.tone),
  ]);
  const V = (w.verdict ?? {}) as Record<string, string>;
  const verdict = V[tone] ?? '';

  const windLevel: AdviceMetrics['windLevel'] =
    beaufortNow >= 7 ? 'strong' : beaufortNow >= 5 ? 'breezy' : beaufortNow >= 3 ? 'light' : 'calm';
  const uvLevel: AdviceMetrics['uvLevel'] =
    uvMax >= 8 ? 'veryHigh' : uvMax >= 6 ? 'high' : uvMax >= 3 ? 'moderate' : 'low';

  return {
    tone,
    verdict,
    beaufort: beaufortNow,
    metrics: { pop, beaufort: beaufortNow, windLevel, uvLevel, visibility },
    alerts,
    outfit,
    plan,
    gear: gear.slice(0, 6),
    scenes,
    window,
  };
}
