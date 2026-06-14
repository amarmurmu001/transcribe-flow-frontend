import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#08090a",
        panel: "#0f1011",
        surface: "#191a1b",
        "surface-hover": "#28282c",
        "text-primary": "#f7f8f8",
        "text-secondary": "#d0d6e0",
        "text-tertiary": "#8a8f98",
        "text-quaternary": "#62666d",
        brand: "#5e6ad2",
        "brand-hover": "#828fff",
        "brand-violet": "#7170ff",
        "border-default": "rgba(255,255,255,0.08)",
        "border-subtle": "rgba(255,255,255,0.05)",
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "h1": ["2rem", { lineHeight: "1.13", letterSpacing: "-0.704px", fontWeight: "510" }],
        "h2": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.288px", fontWeight: "510" }],
        "h3": ["1.25rem", { lineHeight: "1.33", letterSpacing: "-0.24px", fontWeight: "590" }],
        "body": ["1rem", { lineHeight: "1.50", fontWeight: "400" }],
        "body-sm": ["0.938rem", { lineHeight: "1.60", fontWeight: "400" }],
        "caption": ["0.813rem", { lineHeight: "1.50", letterSpacing: "-0.13px", fontWeight: "400" }],
        "label": ["0.75rem", { lineHeight: "1.40", fontWeight: "510" }],
        "mono": ["0.875rem", { lineHeight: "1.50", fontWeight: "400" }],
        "mono-sm": ["0.75rem", { lineHeight: "1.40", fontWeight: "400" }],
      },
      borderRadius: {
        micro: "2px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        section: "80px",
      },
    },
  },
  plugins: [],
};

export default config;
