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
