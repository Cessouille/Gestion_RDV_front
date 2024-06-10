/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        main: {
          primary: "7AB2B2",
          secondary: "#CDE8E5",
          tertiary: "#4D869C",
          quartiary: "#EEF7FF",
        },
      },
    },
  },
  plugins: [],
};
