/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      "custom-gradient-game":
        "linear-gradient(135deg, #F1C2D5 15%, #B3E5FC 50%, #D1C4E9 100%)",
      "custom-gradient-main": "linear-gradient(0deg, #DDCEFF 0%, #F8DFF0 100%)",
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "scrollbar-width": "none", // Firefox
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
