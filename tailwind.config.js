/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original design tokens, preserved 1:1 from the static mockup.
        bitumen: "#0E0E0C",
        bone: "#F2ECDF",
        "bone-deep": "#E7DFCC",
        singlet: "#FAF8F2",
        red: {
          DEFAULT: "#B5392C",
          dark: "#7A2419",
        },
        steel: "#8C8A80",
        ink: "#15140F",
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        sans: ["Archivo", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
      },
    },
  },
  plugins: [],
};
