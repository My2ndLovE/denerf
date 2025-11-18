import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://denerf.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Separate vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('gsap')) {
                return 'vendor-gsap';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  },
  image: {
    domains: [],
    remotePatterns: [],
  },
});
