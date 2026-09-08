// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/lib/site.config.js';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  integrations: [
    react(),
    sitemap({ filter: (page) => !/\/(styleguide|projects|contactus|about)$/.test(page) }),
  ],
  vite: { plugins: [tailwindcss()] },
  redirects: {
    '/projects': '/works',
    '/contactus': '/contact',
    '/about': '/studio',
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
