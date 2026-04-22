import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070a",
          900: "#0a0c10",
          850: "#0d1014",
          800: "#11151b",
          700: "#1a1f27",
          600: "#252b35",
        },
        mist: {
          100: "#f3f5f7",
          200: "#d8dde4",
          300: "#aab1bd",
          400: "#7a828f",
        },
        neon: {
          50: "#e6fff3",
          200: "#9cf6c6",
          300: "#5eecaa",
          400: "#24e08c",
          500: "#0fc978",
          600: "#0ba862",
        },
        violet: {
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        amber: {
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Geist",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(36, 224, 140, 0.45)",
        panel:
          "0 30px 60px -20px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
      },
      backgroundImage: {
        "grid-dim":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(36,224,140,0.25), transparent 60%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "ticker": "ticker 40s linear infinite",
        "scanline": "scanline 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scanline: {
          "0%, 100%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
