/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '200' : '45rem'
      },
      width: {
        '128' : '30rem',
        '97'  : '25rem'
      }
    },
  },
  plugins: [],
}