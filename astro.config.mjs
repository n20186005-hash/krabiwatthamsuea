import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const domain = process.env.CURRENT_SITE_DOMAIN || 'krabiwatthamsuea.com';

// https://astro.build/config
export default defineConfig({
  site: `https://${domain}`,

  /* 全站统一带尾斜杠：GSC 数据显示 /en/ 是自然主形态，
     统一后 /en 会被 301 到 /en/，避免同一页面两个 URL 分摊权重。 */
  trailingSlash: 'always',

  /* 纯静态输出（Cloudflare Pages）：
     三个语言页在构建期预渲染为 /en/index.html、/th/index.html、/zh/index.html，
     由 CDN 直接命中，无需 Worker。天气在构建期抓取一次快照并固化进页面，
     URL 规范化（根路径→/en/、补尾斜杠、www→apex）改由 public/_redirects 完成。 */
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});
