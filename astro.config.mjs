import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://denerf.dev',
  integrations: [tailwind()],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ['gsap'],
          },
        },
      },
    },
  },
  compressHTML: true,
});
