/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        error: "hsl(var(--color-error) / <alpha-value>)",
        danger: "hsl(var(--color-danger) / <alpha-value>)",
        success: "hsl(var(--color-success) / <alpha-value>)",
      },
      backgroundColor: {
        paper: "hsl(var(--color-paper) / <alpha-value>)",
      },
      fontSize: {
        displayLarge: ["var(--dl)", { lineHeight: "64px" }],
        displayMedium: ["var(--dm)", { lineHeight: "52px" }],
        displaySmall: ["var(--ds)", { lineHeight: "44px" }],
        headlineLarge: ["var(--hl)", { lineHeight: "40px" }],
        headlineMedium: ["var(--hm)", { lineHeight: "36px" }],
        headlineSmall: ["var(--hs)", { lineHeight: "32px" }],
        titleLarge: ["var(--tl)", { lineHeight: "28px" }],
        titleMedium: ["var(--tm)", { lineHeight: "24px" }],
        titleSmall: ["var(--ts)", { lineHeight: "20px" }],
        bodyLarge: ["var(--bl)", { lineHeight: "24px" }],
        bodyMedium: ["var(--bm)", { lineHeight: "20px" }],
        bodySmall: ["var(--bs)", { lineHeight: "16px" }],
      },
      borderColor: { DEFAULT: "hsl(var(--color-border) / <alpha-value>)" },

      textColor: {
        onPrimary: "hsl(var(--color-on-primary))",
        onSecondary: "hsl(var(--color-on-secondary))",
        onSuccess: "hsl(var(--color-on-success))",
        onError: "hsl(var(--color-on-error))",
        onDanger: "hsl(var(--color-on-danger))",
      },
      animation: {
        rotate360: "rotate360 1s linear infinite",
        fadeUp: "fadeUp 50ms linear forwards",
        fade: "fade 50ms linear forwards",
      },
      keyframes: {
        rotate360: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        fadeUp: {
          from: {
            transform: "translateY(10px)",
            opacity: 0,
          },
          to: {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        fade: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
