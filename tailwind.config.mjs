/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Base colors - Neural Noir palette
        void: '#0a0a0a',
        surface: '#1a1a1a',
        elevated: '#2a2a2a',

        // Primary - Electric cyan
        primary: {
          DEFAULT: '#00f5ff',
          glow: '#00f5ff80',
          dim: '#00f5ff40',
        },

        // Accent - Purple energy
        accent: {
          DEFAULT: '#bf40ff',
          glow: '#bf40ff80',
          dim: '#bf40ff40',
        },

        // Semantic colors
        success: '#00ff88',
        warning: '#ffaa00',
        error: '#ff0055',

        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
          tertiary: '#606060',
        },
      },

      fontFamily: {
        display: ['Inter Variable', 'SF Pro Display', 'system-ui', 'sans-serif'],
        body: ['Inter Variable', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      fontSize: {
        xs: '0.64rem',      // 10.24px
        sm: '0.8rem',       // 12.8px
        base: '1rem',       // 16px
        lg: '1.25rem',      // 20px
        xl: '1.563rem',     // 25px
        '2xl': '1.953rem',  // 31.25px
        '3xl': '2.441rem',  // 39px
        '4xl': '3.052rem',  // 48.8px
        '5xl': '3.815rem',  // 61px
        '6xl': '4.768rem',  // 76.3px
        hero: '6rem',       // 96px
      },

      spacing: {
        1: '0.25rem',   // 4px
        2: '0.5rem',    // 8px
        3: '0.75rem',   // 12px
        4: '1rem',      // 16px
        6: '1.5rem',    // 24px
        8: '2rem',      // 32px
        12: '3rem',     // 48px
        16: '4rem',     // 64px
        24: '6rem',     // 96px
        32: '8rem',     // 128px
        48: '12rem',    // 192px
      },

      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },

      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },

      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.2)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },

      dropShadow: {
        'glow': '0 0 10px rgba(0, 245, 255, 0.5)',
        'glow-lg': '0 0 20px rgba(0, 245, 255, 0.7)',
        'glow-accent': '0 0 10px rgba(191, 64, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
