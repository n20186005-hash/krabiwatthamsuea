import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const domain = process.env.CURRENT_SITE_DOMAIN || 'krabiwatthamsuea.com';

export default defineConfig({
  site: `https://${domain}`,
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
