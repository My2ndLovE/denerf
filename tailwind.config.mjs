/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Futuristic color palette
        space: {
          50: '#E6E8F0',
          100: '#CDD1E1',
          200: '#9BA3C3',
          300: '#6975A5',
          400: '#374787',
          500: '#0A0E27', // Primary - Deep space navy
          600: '#080B1F',
          700: '#060817',
          800: '#04050F',
          900: '#020307',
        },
        electric: {
          50: '#E6FBFF',
          100: '#CCF7FF',
          200: '#99EFFF',
          300: '#66E7FF',
          400: '#33DFFF',
          500: '#00D9FF', // Secondary - Electric blue
          600: '#00AED9',
          700: '#0082A3',
          800: '#00576D',
          900: '#002B36',
        },
        neon: {
          50: '#F0FFE6',
          100: '#E1FFCC',
          200: '#C3FF99',
          300: '#A5FF66',
          400: '#87FF33',
          500: '#39FF14', // Accent - Neon cyan
          600: '#2ECC10',
          700: '#23990C',
          800: '#186608',
          900: '#0C3304',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // 1.25 ratio scale
        xs: ['0.8rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.6' }],
        xl: ['1.563rem', { lineHeight: '1.4' }],
        '2xl': ['1.953rem', { lineHeight: '1.3' }],
        '3xl': ['2.441rem', { lineHeight: '1.2' }],
        '4xl': ['3.052rem', { lineHeight: '1.1' }],
        '5xl': ['3.815rem', { lineHeight: '1' }],
        '6xl': ['4.768rem', { lineHeight: '1' }],
      },
      spacing: {
        // Consistent 4px base scale
        '4': '0.25rem',   // 4px
        '8': '0.5rem',    // 8px
        '16': '1rem',     // 16px
        '24': '1.5rem',   // 24px
        '32': '2rem',     // 32px
        '48': '3rem',     // 48px
        '64': '4rem',     // 64px
        '96': '6rem',     // 96px
        '128': '8rem',    // 128px
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
