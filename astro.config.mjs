import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

const domain = process.env.CURRENT_SITE_DOMAIN || 'krabiwatthamsuea.com';

// https://astro.build/config
export default defineConfig({
  site: `https://${domain}`,

  /* 全站统一带尾斜杠：GSC 数据显示 /en/ 是自然主形态，
     统一后 /en 会被 301 到 /en/，避免同一页面两个 URL 分摊权重。 */
  trailingSlash: 'always',

  /* 混合输出模式：默认预渲染为静态资源；
     只有 [lang]/index.astro 等显式标记 prerender = false 的路由
     才在 Workers 上按需渲染（实时天气 + URL 规范化需要 SSR）。
     之前使用 output: 'static' 时 prerender = false 完全失效，
     导致 dist/ 中不会生成 /en/、/th/、/zh/ 这些路径，配合
     wrangler 的 not_found_handling: none 直接返回 404。 */
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});
