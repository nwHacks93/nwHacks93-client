import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          basic: "#638C6D",
        },
        white: {
          basic: "#FAFAFA",
        },
        foreground: "var(--foreground)",
        "pastel-blue": "#A7C7E7",
        "pastel-purple": "#D6C3E0",
        "pastel-green": "#B2E0B2",
      },
      maxWidth: {
        content: "420px",
      },
      fontFamily: {
        alegreya: ["Alegreya"],
        alegreya_sans: ["Alegreya_sans"],
      },
    },
  },
  plugins: [],
} satisfies Config;
