/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        water_leaf: {
          50: '#f2fbf9',
          100: '#d4f3ed',
          200: '#9be3d5',
          300: '#75d3c4',
          400: '#48b9aa',
          500: '#2f9d91',
          600: '#237e76',
          700: '#206560',
          800: '#1e514e',
          900: '#1d4442',
          950: '#0b2827',
      },
      }
    },
  },
  plugins: [],
}

