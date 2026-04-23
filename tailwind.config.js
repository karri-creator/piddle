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
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        logo: ['Raleway', 'system-ui', 'sans-serif'],
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
