import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://denerf-agency.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: ['gsap', 'motion'],
    },
  },
  // Enable View Transitions
  experimental: {
    viewTransitions: true,
  },
  // Performance optimizations
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
