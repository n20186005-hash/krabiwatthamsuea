import { defineMiddleware } from 'astro:middleware';
import { languagesList } from './i18n/ui';

/**
 * URL 规范化中间件
 * ------------------------------------------------------------------
 * GSC 数据显示站内长期存在四类重复 URL，权重被严重分散：
 *   1. www.krabiwatthamsuea.com/en  与 krabiwatthamsuea.com/en/  并存
 *   2. /en（无尾斜杠）与 /en/（有尾斜杠）并存
 *   3. /th/th、/zh/zh —— 由历史 canonical/hreflang 错误声明的重复语言段
 *   4. http:// 与 https:// 并存
 *
 * 这里统一用 301 收敛到唯一形态：https://<apex>/<lang>/
 * 规范化在边缘完成，不消耗页面渲染。
 */

const LANGS = languagesList as readonly string[];

/**
 * 裸域与根路径落到哪个语言版本。
 * 选择英文而非泰文的原因：
 *   1. 必须与 <link rel="alternate" hreflang="x-default"> 指向的版本一致，
 *      否则根路径与 x-default 互相矛盾；
 *   2. GSC 中 /en/ 曝光量最高（1,096），是国际流量的实际入口。
 * 若希望裸域优先给泰国本地访客，只需把这里改成 'th'，
 * 并同步调整 i18n/ui.ts 中 buildAlternates 的 xDefault。
 */
const ROOT_LANG = 'en';

/** 带扩展名的路径视为静态资源，交给 CDN，不做尾斜杠处理 */
const ASSET_RE = /\.[a-z0-9]{1,8}$/i;

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;

  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  const url = new URL(request.url);
  const host = url.hostname;
  const isLocal =
    host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host.endsWith('.workers.dev');

  /* 1. 主机名与协议收敛：www → 裸域，http → https */
  if (!isLocal) {
    const apex = host.replace(/^www\./i, '');
    const needsHttps = url.protocol === 'http:';
    if (host !== apex || needsHttps) {
      url.hostname = apex;
      if (needsHttps) url.protocol = 'https:';
      return context.redirect(url.toString(), 301);
    }
  }

  let pathname = url.pathname;

  if (!ASSET_RE.test(pathname)) {
    /* 2. 合并重复语言段：/th/th → /th/，/en/en/gallery → /en/gallery/ */
    const segs = pathname.split('/').filter(Boolean);
    if (segs.length > 1 && LANGS.includes(segs[0])) {
      let i = 0;
      while (i < segs.length && LANGS.includes(segs[i])) i++;
      if (i > 1) {
        url.pathname = '/' + segs.slice(i - 1).join('/') + '/';
        return context.redirect(url.toString(), 301);
      }
    }

    /* 3. 根路径进入默认语言首页（与 x-default 保持一致） */
    if (pathname === '/' || pathname === '') {
      url.pathname = `/${ROOT_LANG}/`;
      return context.redirect(url.toString(), 301);
    }

    /* 4. 页面路径统一补尾斜杠，避免 /en 与 /en/ 被当作两个页面 */
    if (!pathname.endsWith('/')) {
      url.pathname = `${pathname}/`;
      return context.redirect(url.toString(), 301);
    }
  }

  return next();
});
