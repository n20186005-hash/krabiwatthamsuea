import type { APIRoute } from 'astro';
import { languagesList, buildAlternates, htmlLangAttr } from '../i18n/ui';

/* 预渲染为静态文件，由 CDN 直接返回，不占用 Worker 调用 */
export const prerender = true;

export const GET: APIRoute = () => {
  const alts = buildAlternates('');
  const lastmod = new Date().toISOString().slice(0, 10);

  const urlEntries = languagesList
    .map((lang) => {
      const links = [
        ...languagesList.map(
          (l) => `    <xhtml:link rel="alternate" hreflang="${htmlLangAttr(l)}" href="${alts[l]}"/>`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${alts.xDefault}"/>`,
      ].join('\n');

      return [
        '  <url>',
        `    <loc>${alts[lang]}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        '    <priority>1.0</priority>',
        links,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
