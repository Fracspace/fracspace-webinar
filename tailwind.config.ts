import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fracspace: {
          navy: "#1B1640",
          dark: "#0F0B26",
          darker: "#140F30",
          purple: "#2A1B48",
          deep: "#2A2350",
          header: "#1A1538",
          gold: "#F59E0B",
          goldHover: "#FBBF24",
          lightGold: "#FCD34D",
          amber: "#D97706",
          darkAmber: "#B45309",
          cream: "#FFF1DD",
          warmBg: "#FFF8EF",
          faqBg: "#F6F3FB",
          muted: "#5B5670",
          subtle: "#DCD3EE",
          lilac: "#EDE7F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        outfit: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      keyframes: {
        v8tick: {
          "0%": { transform: "scale(1)" },
          "12%": { transform: "scale(1.08)" },
          "30%": { transform: "scale(1)" },
        },
        v8float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        tick: "v8tick 1s ease-out infinite",
        float: "v8float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
