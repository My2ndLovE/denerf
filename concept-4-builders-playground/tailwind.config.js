module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        build: {
          sky: '#87CEEB',
          grass: '#90EE90',
          brick: '#CD5C5C',
          concrete: '#A9A9A9',
          yellow: '#FFD700',
          orange: '#FF8C00',
        },
      },
      fontFamily: {
        build: ['Fredoka', 'sans-serif'],
        playful: ['Comic Neue', 'cursive'],
      },
    },
  },
}
