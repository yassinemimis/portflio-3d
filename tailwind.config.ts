import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber:   { DEFAULT: "#00FFD1", dark: "#007A6B" },
        plasma:  { DEFAULT: "#FF00A8", dark: "#7A004F" },
        electric:{ DEFAULT: "#61DAFB" },
        warning: { DEFAULT: "#FFD43B" },
        danger:  { DEFAULT: "#FF6B6B" },
        void:    { DEFAULT: "#000810" },
        panel:   { DEFAULT: "#02080F" },
      },
      fontFamily: {
        mono:    ["'Share Tech Mono'", "monospace"],
        display: ["'Orbitron'", "sans-serif"],
      },
      animation: {
        "fade-up":   "fadeUp 0.9s ease both",
        "pulse-glow":"pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
