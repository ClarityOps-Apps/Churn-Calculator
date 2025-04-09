/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#437383',
        accent: '#F65D36',
        white: '#FFFFFF',
        'gray-50': '#F7F9FB',
        'gray-100': '#EDF1F5',
        'gray-200': '#E2E8F0',
        'gray-700': '#4A5568',
        'gray-800': '#2D3748',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};