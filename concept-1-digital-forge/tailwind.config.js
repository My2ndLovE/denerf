/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          fire: '#FF6B35',
          ember: '#FFA500',
          metal: '#C0C0C0',
          dark: '#1A1A1A',
          glow: '#FFD700',
        },
      },
      fontFamily: {
        forge: ['Cinzel', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
