/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-pink': '#ff006e',
        'neon-purple': '#b967ff',
        'dark-bg': '#0a0a1a',
      },
      backgroundColor: {
        'card-bg': 'rgba(255, 255, 255, 0.05)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 243, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
        'neon-purple': '0 0 20px rgba(185, 103, 255, 0.5)',
      }
    },
  },
  plugins: [],
}