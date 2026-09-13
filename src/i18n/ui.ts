import zh from './zh.json';
import en from './en.json';
import th from './th.json';
import { siteConfig } from '../config';

export const defaultLang = 'th';
export const languagesList = ['zh', 'en', 'th'] as const;

export const languages: Record<string, string> = {
  zh: '中文',
  en: 'English',
  th: 'ไทย',
};

const ui: Record<string, any> = { zh, en, th };

export function getLangFromUrl(url: URL): string {
  const seg = url.pathname.split('/').filter(Boolean);
  const lang = seg[0];
  return (languagesList as readonly string[]).includes(lang) ? lang : defaultLang;
}

export function getI18n(url: URL) {
  const lang = getLangFromUrl(url);
  const messages = ui[lang];
  const t = (key: string): string => {
    const found = key
      .split('.')
      .reduce<any>((o, i) => (o == null ? undefined : o[i]), messages);
    return found ?? '';
  };
  return { lang, messages, t };
}

/**
 * 生成各语言版本的规范 URL（canonical / hreflang / og:url 共用）。
 *
 * 两个必须遵守的规则：
 * 1. URL 一律带尾斜杠，与 Cloudflare 上的实际资源路径保持一致，
 *    避免 /en 与 /en/ 被 Google 当成两个页面分摊权重。
 * 2. 传入的 path 必须剥掉开头的语言段。历史版本在首页传入 "/th"，
 *    结果生成了 https://domain/th/th 并被写进 canonical 与全部 hreflang，
 *    导致 GSC 里长期存在 /th/th、/zh/zh 这类重复索引 URL。
 */
export function buildAlternates(path = ''): Record<string, string> {
  const base = siteConfig.baseUrl.replace(/\/+$/, '');
  const segs = path.split('/').filter(Boolean);
  while (segs.length && (languagesList as readonly string[]).includes(segs[0])) segs.shift();
  const clean = segs.join('/');

  const mk = (l: string) => `${base}/${l}/${clean ? clean + '/' : ''}`;
  return {
    zh: mk('zh'),
    en: mk('en'),
    th: mk('th'),
    /* 英文是主要入口语言，x-default 指向它比指向泰语更利于国际流量归集 */
    xDefault: mk('en'),
  };
}

/**
 * 从任意路径中取出「语言段之后」的有效路径，并剥掉所有重复的语言前缀。
 * 例如 /th/th/reviews -> reviews，/en/ -> ''。
 * 用于语言切换器，杜绝 /th/th 这类路径被反复自我复制。
 */
export function stripLangSegments(pathname: string): string {
  const segs = pathname.split('/').filter(Boolean);
  while (segs.length && (languagesList as readonly string[]).includes(segs[0])) segs.shift();
  return segs.join('/');
}

export function htmlLangAttr(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  return lang;
}
