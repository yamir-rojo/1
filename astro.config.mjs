import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  server: { port: 4321, host: true },
  site: (process.env.SITE_ORIGIN || 'https://yamirrojo.com').replace(/^http:/, 'https:'),
  base: process.env.BASE_PATH || '/',
});
