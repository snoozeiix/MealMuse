/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: { 50: '#f4f7f1', 100: '#e6ede0', 500: '#94a37e', 600: '#7a8a63' },
        cream: '#fffaf0',
      },
    },
  },
  plugins: [],
}
