/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          50: "#fefbf3",
          100: "#fdf3db",
          200: "#fceeca",
          300: "#fae6b1",
          400: "#f9e1a2",
          500: "#f8d98b",
          600: "#e2c57e",
          700: "#b09a63",
          800: "#88774c",
          900: "#685b3a",
        },
        gray: {
          50: "#eaeaea",
          100: "#bebebf",
          200: "#9e9ea0",
          300: "#727275",
          400: "#56565a",
          500: "#2c2c31",
          600: "#28282d",
          700: "#1f1f23",
          800: "#18181b",
          900: "#121215",
        },
      },
      dropShadow: { text: "0px 0px 7px rgba(0, 0, 0, 0.75)" },
      boxShadow: {
        poster: "0px 0px 20px -3px #F8D98B",
      },
      backgroundImage: {
        gradientYellow:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0) 47.51%, rgba(248, 217, 139, 0.8) 100%, transparent)",
      },
    },
  },
  plugins: [],
};
