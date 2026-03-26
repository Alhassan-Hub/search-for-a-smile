/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Fixed a typo here
  ],
  theme: {
    extend: {
      colors: {
        // Professional Charity Palette
        'brand-gold': '#D4AF37',       // Elegant, muted gold/yellow
        'brand-gold-light': '#FEF3C7', // Very soft yellow for backgrounds
        'brand-dark': '#1F2937',       // Charcoal (Soft black for high readability)
        'brand-gray': '#6B7280',       // Gray for secondary text
        'brand-light': '#FAFAFA',      // Off-white for clean backgrounds
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // Modern, subtle shadow
        'elegant': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}