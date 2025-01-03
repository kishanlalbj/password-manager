/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "custom-2": "300px 1fr"
      },
      colors: {
        "twitter-blue": "#1DA1f2",
        primary: "#1C1C1C",
        secondary: "#262626"
      },
      screens: {
        xs: "475px"
      }
    }
  },
  plugins: []
};
