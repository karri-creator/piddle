/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        logo: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
      colors: {
        blue: '#2583FF',
        coral: '#FF6B6B',
        sunshine: '#FFD64D',
        cream: '#FFF7EE',
        charcoal: '#1A1A1A',
      },
    },
  },
  plugins: [],
}
