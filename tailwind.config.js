/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // penting buat toggle manual

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // optional (biar ada branding)
      },
    },
  },

  plugins: [],
};