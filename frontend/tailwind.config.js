/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'enterprise-blue': {
          DEFAULT: '#1e3a5f',
          light: '#2d4a6f',
          dark: '#152a45',
        },
      },
    },
  },
  plugins: [],
}
