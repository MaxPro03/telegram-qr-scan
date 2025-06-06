import('tailwindcss')
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      primary: '#FF5B0A',
      secondary: '#707579',
      green: '#1C7C4C',
      'second-green': '#DBF6CB',
      blue: '#002889',
      'second-blue': '#CCE4FF',
      yellow: '#C57718',
      'second-yellow': '#FFF2DD',
    },
  },
  plugins: [],
}

