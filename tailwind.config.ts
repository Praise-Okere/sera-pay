import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Emerald – main actions, CTAs
          dark: '#047857',    // Deep – headers, emphasis
          light: '#D1FAE5',   // Mint – backgrounds, subtle accents
        },
        neutral: {
          DEFAULT: '#F9FAFB', // Off-white – surfaces
          dark: '#111827',    // Near-black – text, contrast
        },
        accent: {
          success: '#059669', // Validated transactions
          warning: '#DC2626', // Error states
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'glass': '0 2px 12px rgba(16, 185, 129, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
