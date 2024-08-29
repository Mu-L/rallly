const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
    "../../packages/tailwind-config/tailwind.config.js",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
  ],
  theme: {
    extend: {
      boxShadow: {
        huge: "0px 51px 78px rgb(17 7 53 / 5%), 0px 21.3066px 35.4944px rgb(17 7 53 / 4%), 0px 11.3915px 18.9418px rgb(17 7 53 / 3%), 0px 6.38599px 9.8801px rgb(17 7 53 / 3%), 0px 3.39155px 4.58665px rgb(17 7 53 / 2%), 0px 1.4113px 1.55262px rgb(17 7 53 / 1%), inset 0px 1px 0px rgb(41 56 78 / 5%)",
      },
      colors: {
        primary: {
          '50': '#D5EEE6',
          '100': '#BEDDD2',
          '200': '#A6CCBF',
          '300': '#8EBBAB',
          '400': '#5F9885',
          '500': '#2F765E',
          '600': '#005437',
          '700': '#00432C',
          '800': '#003221',
          '900': '#002216',
          '950': '#002216',
          DEFAULT: '#005437',
          foreground: colors.white,
          background: '#D5EEE6',
        },
        secondary: {
          background: colors.gray["100"],
          DEFAULT: colors.gray["100"],
          foreground: '#003221',
        },
        gray: {
          ...colors.gray,
          '50': "#E5F3EB",
          '100': "#E5F3EB",
          '200': "#E5F3EB",
        },
        border: colors.gray["200"],
        input: {
          DEFAULT: colors.gray["200"],
          background: colors.white,
          foreground: '#003221',
        },
        ring: {
          DEFAULT: colors.gray["300"],
        },
        destructive: {
          DEFAULT: colors.rose["600"],
          background: colors.rose["50"],
          foreground: colors.rose["50"],
        },
        background: colors.white,
        foreground: '#003221',
        accent: {
          DEFAULT: "#E5F3EB",
        },
        muted: {
          DEFAULT: "#E5F3EB",
          background: "#E5F3EB",
          foreground: colors.gray["500"],
        },
        popover: {
          DEFAULT: colors.white,
          foreground: '#003221',
        },
        card: {
          DEFAULT: colors.white,
          background: colors.white,
          foreground: '#003221',
        },
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        popIn: {
          "0%": {
            transform: "scale(0.8) translateY(-10px)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1) translateY(0px)",
            opacity: "1",
            translateY: "0",
          },
        },
      },
      animation: {
        wiggle: "wiggle 0.2s ease-in-out",
        popIn: "popIn 0.1s ease-out",
      },
      screens: {
        xs: "375px",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      gap: {
        DEFAULT: "0.625rem",
        md: "0.625rem",
      },
    },
  },
};
