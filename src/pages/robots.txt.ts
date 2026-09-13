import type { APIRoute } from 'astro';
import { siteConfig } from '../config';

/* 预渲染为静态文件 */
export const prerender = true;

export const GET: APIRoute = () => {
  const base = siteConfig.baseUrl.replace(/\/+$/, '');

  const body = `User-agent: *
Allow: /
Disallow: /_worker.js
Disallow: /_routes.json

Sitemap: ${base}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
