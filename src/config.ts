const domain = typeof process !== 'undefined' && process.env.CURRENT_SITE_DOMAIN 
  ? process.env.CURRENT_SITE_DOMAIN 
  : (import.meta.env && import.meta.env.CURRENT_SITE_DOMAIN) || 'krabiwatthamsuea.com';

export const siteConfig = {
  name: 'Wat Tham Suea',
  baseUrl: `https://${domain}`,
  locales: ['zh', 'en', 'th'] as const,
};

export default siteConfig;

export const ogLocale: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  th: 'th_TH',
};

/**
 * 单景点 SEO 实体绑定配置（变量表）
 * ------------------------------------------------------------------
 * {{DOMAIN_NAME}}            -> attraction.domainName
 * {{ATTRACTION_FULL_NAME}}   -> attraction.fullName
 * {{ATTRACTION_SHORT_NAME}}  -> attraction.shortName
 * {{CITY_NAME}}              -> attraction.city
 * {{STATE_PROVINCE}}         -> attraction.stateProvince
 * {{COUNTRY_NAME}}           -> attraction.country
 * {{COUNTRY_CODE_2LETTER}}   -> attraction.countryCode
 * {{POSTAL_CODE}}            -> attraction.postalCode
 * {{LATITUDE}} {{LONGITUDE}} -> attraction.latitude / attraction.longitude
 * {{MAPS_SHARE_URL}}         -> attraction.mapsShareUrl
 * {{MAPS_EMBED_SRC}}         -> attraction.mapsEmbedSrc
 * {{NEARBY_LANDMARK_1/2}}    -> attraction.nearbyLandmarks
 * {{GOVT_TOURISM_URL}}       -> attraction.govtTourismUrl
 * ------------------------------------------------------------------
 */
export const attraction = {
  domainName: domain,
  fullName: 'Wat Tham Suea',
  fullNameThai: 'วัดถ้ำเสือ',
  shortName: 'Krabi Wat Tham Suea',

  city: 'Krabi',
  cityFull: 'Krabi Town',
  stateProvince: 'Krabi Province',
  country: 'Thailand',
  countryCode: 'TH',
  postalCode: '81000',
  streetAddress: '35 Krabi Noi, Mueang Krabi District',

  latitude: 8.1239259,
  longitude: 98.925131,

  telephone: '+66887926519',
  telephoneDisplay: '+66 88 792 6519',

  mapsShareUrl: 'https://maps.app.goo.gl/N62pZYGC8GDkVU1v8',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=8.1239259,98.925131&amp;hl=en&amp;z=15&amp;output=embed',

  govtTourismUrl: 'https://www.tourismthailand.org/destinations/krabi',
  tourismAuthorityUrl: 'https://www.tourismthailand.org',
  /* 指向规范条目名，避免 sameAs 指向跳转链削弱实体绑定 */
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Tiger_Cave_Temple',

  nearbyLandmarks: ['Ao Nang Beach', 'Railay Beach'],

  /**
   * 景区所处的自然环境类型，用于驱动天气模块的场景化建议。
   * 可选值：mountain（山地/峡谷）| cave（溶洞）| forest（森林）| water（河湖/漂流）|
   *        coast（海滨）| urban（城市人文）| desert（沙漠戈壁）
   */
  environments: ['mountain', 'cave', 'forest'] as const,

  /**
   * 顺游海滨参考点：用于输出近海海况（浪高、海水温度、潮汐）提示。
   * 置为 null 可关闭该模块。
   */
  nearbyCoast: {
    name: 'Ao Nang Beach',
    latitude: 8.0311,
    longitude: 98.822,
  } as { name: string; latitude: number; longitude: number } | null,

  /** 评分与评价数：与 Google 地图营业档案同步（甲米虎穴寺，非北碧府同名寺），页面须标注来源 */
  ratingValue: '4.6',
  reviewCount: '14009',
  reviewCountDisplay: '14,009',

  openingHours: { opens: '06:00', closes: '18:00' },

  heroImage: '/gallery/wat-tham-suea-13.jpg',
  galleryImages: [
    '/gallery/wat-tham-suea-13.jpg',
    '/gallery/wat-tham-suea-1.jpg',
    '/gallery/wat-tham-suea-5.jpg',
    '/gallery/wat-tham-suea-7.jpg',
    '/gallery/wat-tham-suea-11.jpg',
  ],
};

export type Attraction = typeof attraction;
