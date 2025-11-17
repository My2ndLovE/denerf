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
        neural: {
          primary: '#00F0FF',
          secondary: '#B024FF',
          accent: '#FF2E97',
          glow: '#00FFAA',
          dark: '#0A0A1F',
          bg: '#050510',
        },
      },
      fontFamily: {
        cyber: ['Orbitron', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
