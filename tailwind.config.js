/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "540px", //640px
      md: "786px", //786pxpx
      lg: "1000px", //1024px
      xl: "1280px", //1280px
      "2xl": "1536px", //1536px
    },
    extend: {
      container: {
        center: true,
      },
      colors: {
        dark: "rgba(18 18 18)",
        primary: "#0095f6",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
  ],
};
