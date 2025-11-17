module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        liquid: {
          purple: '#C77DFF',
          pink: '#E0AAFF',
          blue: '#7209B7',
          dark: '#10002B',
          light: '#F0C9FF',
        },
      },
      fontFamily: {
        liquid: ['Quicksand', 'sans-serif'],
      },
    },
  },
}
