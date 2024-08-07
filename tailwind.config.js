/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      "custom-gradient-game":
        "linear-gradient(135deg, #F1C2D5 15%, #B3E5FC 50%, #D1C4E9 100%)",
      "custom-gradient-main": "linear-gradient(0deg, #DDCEFF 0%, #F8DFF0 100%)",
      "custom-gradient-main2":
        "linear-gradient(0deg, #DDCEFF 100%, #F8DFF0 0%)",
      "custom-gradient-basicBtn":
        "linear-gradient(135deg, #FFFFFF 1%, rgba(30,144,255,0.3) 40%, rgba(30,144,255,0.3) 100%)",
      "custom-modal":
        "linear-gradient(135deg, rgba(195,210,255,0.45) 0%, rgba(142,210,255,0.45) 100%)",
    },
    extend: {
      scrollSnapType: {
        y: "y mandatory",
      },
      scrollSnapAlign: {
        center: "center",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
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
