/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Minimal Brutalism color palette
        'brand': {
          'black': '#000000',
          'white': '#FFFFFF',
          'cyan': '#00F0FF',
          'purple': '#6B2FF6',
          'yellow': '#FFE600'
        }
      },
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Inter Variable', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'hero': ['clamp(3rem, 15vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'mega': ['clamp(2rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'huge': ['clamp(1.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }]
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem'
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      backdropBlur: {
        'xs': '2px'
      }
    }
  },
  plugins: []
};
