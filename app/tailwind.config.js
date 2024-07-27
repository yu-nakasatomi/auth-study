/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#174160",
        PrimarySub: "#F68C50",
        PrimarySub_light: "#FFF7F2",
        Secondary: "#E5115D",
        SecondaryDark: "#650427",
        White: "#FFFFFF",
        Gray: {
          1: "#F9FAFB",
          2: "#F3F4F6",
          3: "#DFE4EA",
          4: "#9CA3AF",
          5: "#637381",
        },
      },
    },
  },
  plugins: [],
};
