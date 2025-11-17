module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        matrix: {
          green: '#00FF41',
          dark: '#0D0208',
          glow: '#39FF14',
          dim: '#008F11',
        },
      },
      fontFamily: {
        matrix: ['Courier New', 'monospace'],
        cyber: ['Share Tech Mono', 'monospace'],
      },
    },
  },
}
