/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f43f5e",
        secondary: "#a855f7",
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
      },
    },
  },
  plugins: [],
};
