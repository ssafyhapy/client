/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      "custom-gradient-game":
        "linear-gradient(135deg, #F1C2D5 15%, #B3E5FC 50%, #D1C4E9 100%)",
      "custom-gradient-main":
        "linear-gradient(0deg, #DDCEFF 0%, #F8DFF0 100%)"
    },
  },
  plugins: [],
};