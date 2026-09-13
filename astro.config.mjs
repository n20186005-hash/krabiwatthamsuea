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

  /* 默认全部预渲染为静态资源；只有需要实时天气与 URL 规范化的路由按需在 Workers 上渲染 */
  output: 'static',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});
