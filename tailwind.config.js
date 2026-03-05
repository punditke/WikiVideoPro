/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        zinc: {
          950: '#0a0a0f',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
      },
    },
  },
  plugins: [],
}
