export const siteConfig = {
  name: 'Wat Tham Suea',
  baseUrl: 'https://krabiwatthamsuea.com',
  locales: ['zh', 'en', 'th'] as const,
};

export default siteConfig;

export const ogLocale: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  th: 'th_TH',
};
