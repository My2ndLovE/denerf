import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://denerf.com', // Update with actual domain
  integrations: [
    tailwind({
      applyBaseStyles: false, // We'll use custom base styles
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
          manualChunks: {
            'animation': ['gsap'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['gsap'],
    },
  },
  image: {
    domains: [],
    remotePatterns: [],
  },
  experimental: {
    clientPrerender: true,
    directRenderScript: true,
  },
});
