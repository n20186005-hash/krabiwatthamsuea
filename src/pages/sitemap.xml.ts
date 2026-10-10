import type { APIRoute } from 'astro';
import { languagesList, buildAlternates, htmlLangAttr } from '../i18n/ui';
import { topicSlugs } from '../i18n/topics';

/* 预渲染为静态文件，由 CDN 直接返回，不占用 Worker 调用 */
export const prerender = true;

export const GET: APIRoute = () => {
  const alts = buildAlternates('');
  const lastmod = new Date().toISOString().slice(0, 10);

  const homeEntries = languagesList
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

  // 专题页：每个主题 × 每种语言，独立 canonical + hreflang 互链
  const topicEntries = topicSlugs
    .flatMap((slug) => {
      const talts = buildAlternates(slug);
      return languagesList.map((lang) => {
        const links = [
          ...languagesList.map(
            (l) => `    <xhtml:link rel="alternate" hreflang="${htmlLangAttr(l)}" href="${talts[l]}"/>`
          ),
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${talts.xDefault}"/>`,
        ].join('\n');
        return [
          '  <url>',
          `    <loc>${talts[lang]}</loc>`,
          `    <lastmod>${lastmod}</lastmod>`,
          '    <changefreq>weekly</changefreq>',
          '    <priority>0.8</priority>',
          links,
          '  </url>',
        ].join('\n');
      });
    })
    .join('\n');

  const urlEntries = [homeEntries, topicEntries].filter(Boolean).join('\n');

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
