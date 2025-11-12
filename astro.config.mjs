import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 120,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'animation-vendor': ['framer-motion'],
            'gsap-vendor': ['gsap'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['@studio-freight/lenis'],
    },
  },
});
