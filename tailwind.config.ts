import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // 👈 THIS unlocks dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
};

export default config;
