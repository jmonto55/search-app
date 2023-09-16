/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: "450px",
      },
      animation: {
        'pulse-fast': 'pulse 0.8s ease-out infinite',
      },
    },
  },
  plugins: [],
}

