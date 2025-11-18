/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Neural Noir Palette
        void: '#0a0a0a',
        surface: '#1a1a1a',
        elevated: '#2a2a2a',
        primary: {
          DEFAULT: '#00f5ff',
          glow: '#00f5ff80',
          dim: '#00f5ff40',
        },
        accent: {
          DEFAULT: '#bf40ff',
          glow: '#bf40ff80',
          dim: '#bf40ff40',
        },
        success: '#00ff88',
        warning: '#ffaa00',
        error: '#ff0055',
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
          tertiary: '#606060',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'hero': '6rem',
        '6xl': '4.768rem',
        '5xl': '3.815rem',
        '4xl': '3.052rem',
        '3xl': '2.441rem',
        '2xl': '1.953rem',
        'xl': '1.563rem',
        'lg': '1.25rem',
        'base': '1rem',
        'sm': '0.8rem',
        'xs': '0.64rem',
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
        'slower': '800ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backgroundImage: {
        'glow': 'radial-gradient(circle, var(--tw-gradient-from) 0%, transparent 70%)',
        'grid': 'repeating-linear-gradient(0deg, transparent, transparent 50px, #2a2a2a 50px, #2a2a2a 51px)',
      },
    },
  },
  plugins: [],
};
