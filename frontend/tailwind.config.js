/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a1628',
          800: '#0d1b2a',
          700: '#0f1f2f',
        },
        cyan: {
          500: '#00d4ff',
          600: '#0099cc',
        }
      }
    },
  },
  plugins: [],
}