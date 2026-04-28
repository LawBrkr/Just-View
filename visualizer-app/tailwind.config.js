/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terracotta': '#C05746',
        'sand': '#D2B48C',
        'cream': '#F5F5DC',
        'sage': '#8A9A5B',
        'earth-brown': '#3E2723',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      aspectRatio: {
        'social': '1080 / 1350',
      },
    },
  },
  plugins: [],
}
