/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-red': '#ffb3ba',
        'pastel-pink': '#ffdfd3',
        'pastel-red-dark': '#ff9ba3',
      },
    },
  },
  plugins: [],
}