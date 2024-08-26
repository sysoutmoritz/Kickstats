import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "17": "4.25rem",
        "18": "4.5rem",
        "19": "4.75rem",
        "23": "5.75rem",
      }
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
