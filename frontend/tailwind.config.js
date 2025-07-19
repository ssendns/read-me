const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        accenthover: "var(--color-accent-hover)",
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        white: "var(--color-white)",
        border: "var(--color-border)",
        hover: "var(--color-hover)",
      },
      fontFamily: {
        typewriter: ["'Courier Prime'", "monospace"],
        sans: [...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        gutter: "var(--space-gutter)",
        section: "var(--space-section)",
        block: "var(--space-block)",
        layoutY: "1rem",
        layoutX: "2rem",
      },
      maxWidth: {
        container: "var(--max-width-container)",
        content: "var(--max-width-content)",
        narrow: "var(--max-width-narrow)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
