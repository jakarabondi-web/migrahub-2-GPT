import type { Config } from "tailwindcss";

// Every value here maps 1:1 to MigraHub Design System v1.0 (Phase 5).
// Claude must never invent spacing, radii, or colors outside this file.
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-deep": "var(--color-primary-deep)",
        secondary: "var(--color-secondary)",
        success: "var(--color-success)",
        torch: "var(--color-torch)",
        danger: "var(--color-danger)",
        background: "var(--color-background)",
        card: "var(--color-card)",
        border: "var(--color-border)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        h2: ["36px", { lineHeight: "1.15", fontWeight: "700" }],
        h3: ["28px", { lineHeight: "1.2", fontWeight: "600" }],
        h4: ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      spacing: {
        1: "4px",
        2: "8px",
        4: "16px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
        32: "128px",
      },
      borderRadius: {
        button: "12px",
        card: "16px",
        dialog: "20px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.06)",
        md: "0 4px 12px rgba(15, 23, 42, 0.08)",
        lg: "0 12px 32px rgba(15, 23, 42, 0.10)",
      },
      transitionDuration: {
        150: "150ms",
        250: "250ms",
      },
    },
  },
  plugins: [],
};

export default config;
