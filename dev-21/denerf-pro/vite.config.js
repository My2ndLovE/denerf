import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                work: resolve(__dirname, 'src/work.html'),
                services: resolve(__dirname, 'src/services.html'),
                about: resolve(__dirname, 'src/about.html'),
            },
            output: {
                // Obfuscate file names
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.logs
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info'], // Remove specific functions
            },
            mangle: {
                toplevel: true, // Obfuscate top-level variable names
            },
            format: {
                comments: false, // Remove all comments
            },
        },
    },
    server: {
        open: '/index.html',
    },
});
