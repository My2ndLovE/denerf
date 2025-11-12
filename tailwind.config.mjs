/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'primary': '#00d4ff',
        'secondary': '#8b5cf6',
        'accent': '#f59e0b',
        'text-primary': '#f8fafc',
        'glass': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'hologram-idle': 'hologram-idle 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'hologram-idle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(300%)' },
        },
        'glitch': {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translateX(0)' },
          '10%': { clipPath: 'inset(10px 0 40px 0)', transform: 'translateX(2px)' },
          '20%': { clipPath: 'inset(40px 0 10px 0)', transform: 'translateX(-2px)' },
          '30%': { clipPath: 'inset(0 0 0 0)', transform: 'translateX(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
