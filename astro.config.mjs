import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            'three': ['three'],
            'gsap': ['gsap'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['three', '@react-three/fiber', '@react-three/drei'],
    },
  },
});
