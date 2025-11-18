/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        void: '#0a0a0a',
        surface: '#1a1a1a',
        elevated: '#2a2a2a',
        primary: {
          DEFAULT: '#00f5ff',
          glow: 'rgba(0, 245, 255, 0.5)',
          dim: 'rgba(0, 245, 255, 0.25)',
        },
        accent: {
          DEFAULT: '#bf40ff',
          glow: 'rgba(191, 64, 255, 0.5)',
          dim: 'rgba(191, 64, 255, 0.25)',
        },
        coral: '#ff6b6b',
        golden: '#ffd700',
        success: '#00ff88',
        warning: '#ffaa00',
        error: '#ff0055',
      },
      fontFamily: {
        display: ['Inter Variable', 'SF Pro Display', 'system-ui'],
        body: ['Inter Variable', 'system-ui'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        xs: '0.64rem',
        sm: '0.8rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.563rem',
        '2xl': '1.953rem',
        '3xl': '2.441rem',
        '4xl': '3.052rem',
        '5xl': '3.815rem',
        '6xl': '4.768rem',
        hero: '6rem',
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
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5', filter: 'blur(8px)' },
          '100%': { opacity: '1', filter: 'blur(12px)' },
        },
      },
    },
  },
  plugins: [],
}
