/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'powder-blue': '#F0F4F7', // Very light, desaturated blue for backgrounds
        'navy': '#0A192F',        // Deep, sophisticated navy for text and buttons
        'slate': '#64748B',       // Soft slate for secondary text
        'crisp-white': '#FFFFFF', // Pure white for cards
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Luxury headings
        sans: ['Inter', 'sans-serif'],          // Clean body text
      }
    },
  },
  plugins: [],
}