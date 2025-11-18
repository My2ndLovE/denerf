import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://denerf.com',
  integrations: [
    tailwind({
      applyBaseStyles: false, // We'll handle base styles ourselves
    })
  ],
  output: 'static',
  compressHTML: true,
  scopedStyleStrategy: 'where',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: {
            'three': ['three'],
            'gsap': ['gsap'],
            'lenis': ['lenis']
          }
        }
      }
    },
    ssr: {
      noExternal: ['three']
    }
  },
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: false
  }
});
