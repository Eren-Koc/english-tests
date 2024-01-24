/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-black':'#000',
        'app-white':'#FFF',
        'app-purple': '#4F46E5',
        'app-bg':'#E6E6E6',
        'app-gray':'#a3a3a3',

      },
    },
  },
  plugins: [],
}

