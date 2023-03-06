/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    
    extend: {
      colors:{
        'green':'#108954',
        'dark':'#121212',
        'light':'#282828',
        'lightest':'#838383',
        'darkest':'#191414'

      }
    },
  },
  plugins: [],
});