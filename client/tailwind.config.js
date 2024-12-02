/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "custom-2": "300px 1fr"
      },
      colors: {
        "twitter-blue": "#1DA1f2"
      },
      screens: {
        xs: "475px"
      }
    }
  },
  plugins: []
};
