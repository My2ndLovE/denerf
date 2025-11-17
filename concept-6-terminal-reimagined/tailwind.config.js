module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        term: {
          bg: '#0C0C0C',
          green: '#0DBC79',
          cyan: '#3A96DD',
          yellow: '#E5E510',
          red: '#CD3131',
          purple: '#BC3FBC',
        },
      },
      fontFamily: {
        term: ['Fira Code', 'monospace'],
      },
    },
  },
}
