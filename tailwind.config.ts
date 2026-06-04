import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Prompt", "sans-serif"],
        serif: ["Prompt", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fdf6f0",
          100: "#faeadb",
          200: "#f3d0b0",
          300: "#eab07d",
          400: "#df8b48",
          500: "#d86d28",
          600: "#b36f40",
          700: "#a7411b",
          800: "#86351d",
          900: "#6d2e1a",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e4ece3",
          200: "#c9dac8",
          300: "#a1bfa0",
          400: "#739f72",
          500: "#527f51",
          600: "#3f6440",
          700: "#334f34",
          800: "#2b402c",
          900: "#243525",
        },
        warm: {
          50: "#fdfaf5",
          100: "#f9f2e7",
          200: "#f1e2c9",
          300: "#e6cca3",
          400: "#d9b076",
          500: "#cc9450",
          600: "#b87a38",
          700: "#985f2d",
          800: "#7c4d28",
          900: "#664124",
        },
        neutral: {
          50: "#fafaf9",
          100: "#f5f5f3",
          200: "#e8e8e4",
          300: "#d2d2cc",
          400: "#a9a9a0",
          500: "#7d7d74",
          600: "#626259",
          700: "#4f4f47",
          800: "#42423c",
          900: "#3a3a34",
          950: "#1e1e1a",
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      lineHeight: {
        "relaxed-thai": "1.9",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 20px 0 rgba(0,0,0,0.06)",
        card: "0 4px 32px 0 rgba(0,0,0,0.08)",
        elevated: "0 8px 48px 0 rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
