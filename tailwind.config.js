const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "hsla(var(--border))",
        input: "hsla(var(--input))",
        ring: "hsla(var(--ring))",
        background: "hsla(var(--background))",
        foreground: "hsla(var(--foreground))",
        primary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsla(var(--secondary))",
          foreground: "hsla(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsla(var(--destructive))",
          foreground: "hsla(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsla(var(--muted))",
          foreground: "hsla(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsla(var(--accent))",
          foreground: "hsla(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsla(var(--popover))",
          foreground: "hsla(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsla(var(--card))",
          foreground: "hsla(var(--card-foreground))",
        },
      },
      borderColor: {
        outline: {
          DEFAULT: "hsla(var(--border-grey))",
          primary: "hsla(var(--border))",
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      textColor: {
        primary: {
          DEFAULT: "hsla(var(--text-primary))",
          foreground: "hsla(var(--text-foreground))",
        },
        secondary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))",
        },
        placeholder: "hsla(var(--placeholder))",
      },
      fontFamily: {
        gotham: ["Gotham-Rounded-Medium"],
        "gotham-light": ["Gotham-Rounded-Light"],
        "gotham-bold": ["Gotham-Rounded-Bold"],
        lato: ["Lato"],
        "lato-light": ["Lato-Light"],
        "lato-bold": ["Lato-Bold"],
      },
      boxShadow: {
        "drop-shadow": "0px 4px 9px 0px #00000040, 0px -4px 4px 0px #0000001F",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
