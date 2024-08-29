import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|dropdown|ripple|spinner|menu|divider|popover).js"
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
  plugins: [nextui()],
  darkMode: "class",
};
export default config;
