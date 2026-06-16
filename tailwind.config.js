/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        compound: {
          black:    '#0D0D0B',
          white:    '#F7F6F2',
          steel:    '#7A8290',
          concrete: '#B8B4AE',
          amber:    '#C9913A',
          'amber-light': '#E5B86A',
          surface:  '#F0EDE8',
          border:   '#D8D4CE',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}

