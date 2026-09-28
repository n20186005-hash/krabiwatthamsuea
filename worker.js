// Edge URL normalization (ported from the old Astro middleware.ts).
// Keeps a single canonical form: https://<apex>/<lang>/  with 301s,
// then serves the prerendered static assets from the ASSETS binding.

const LANGS = ['zh', 'en', 'th'];
const ROOT_LANG = 'en'; // must match x-default in src/i18n/ui.ts buildAlternates
const ASSET_RE = /\.[a-z0-9]{1,8}$/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;
    const isLocal =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '[::1]' ||
      host.endsWith('.workers.dev');

    if (!isLocal && (request.method === 'GET' || request.method === 'HEAD')) {
      // 1. host/protocol: www -> apex, http -> https
      const apex = host.replace(/^www\./i, '');
      const needsHttps = url.protocol === 'http:';
      if (host !== apex || needsHttps) {
        url.hostname = apex;
        if (needsHttps) url.protocol = 'https:';
        return Response.redirect(url.toString(), 301);
      }

      let pathname = url.pathname;
      if (!ASSET_RE.test(pathname)) {
        const segs = pathname.split('/').filter(Boolean);

        // 2. collapse duplicate lang segments: /th/th -> /th/, /en/en/x -> /en/x/
        if (segs.length > 1 && LANGS.includes(segs[0])) {
          let i = 0;
          while (i < segs.length && LANGS.includes(segs[i])) i++;
          if (i > 1) {
            url.pathname = '/' + segs.slice(i - 1).join('/') + '/';
            return Response.redirect(url.toString(), 301);
          }
        }

        // 3. root -> default language home (matches x-default)
        if (pathname === '/' || pathname === '') {
          url.pathname = `/${ROOT_LANG}/`;
          return Response.redirect(url.toString(), 301);
        }

        // 4. ensure trailing slash so /en and /en/ are not two pages
        if (!pathname.endsWith('/')) {
          url.pathname = `${pathname}/`;
          return Response.redirect(url.toString(), 301);
        }
      }
    }

    return env.ASSETS.fetch(request);
  },
};
