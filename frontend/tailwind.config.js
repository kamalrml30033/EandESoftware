/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        'enterprise-blue': {
          DEFAULT: '#1e3a5f',
          light: '#2d5a8a',
          dark: '#152a45',
          accent: '#3b82f6',
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgb(30 58 95 / 0.08), 0 2px 4px -2px rgb(30 58 95 / 0.06)',
        'card-hover': '0 20px 25px -5px rgb(30 58 95 / 0.1), 0 8px 10px -6px rgb(30 58 95 / 0.08)',
      },
    },
  },
  plugins: [],
}
