/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{jsx,js}",
    "./components/**/*.{jsx,js}",
    "./app/**/*.{jsx,js}",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [], // Remove or replace the `tailwindcss-animate` plugin
};

export default config;
