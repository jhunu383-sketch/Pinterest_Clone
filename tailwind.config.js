/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#b7001a",
        "primary-container": "#e60023",
        background: "#fcf9f8",
        surface: "#fcf9f8",
        "on-background": "#1c1b1b",
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#5e3f3c",
        secondary: "#5d5f5f",
        "on-secondary": "#ffffff",
        "surface-container": "#f0edec",
        "surface-container-low": "#f6f3f2",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#e5e2e1",
        "surface-container-high": "#ebe7e7",
        "on-primary": "#ffffff",
        outline: "#936e6b",
        "outline-variant": "#e8bcb8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        "stack-md": "16px",
        "stack-sm": "8px",
        "margin-desktop": "24px",
        "margin-mobile": "16px",
        gutter: "16px",
        "stack-lg": "32px",
      },
    },
  },
  plugins: [],
}
