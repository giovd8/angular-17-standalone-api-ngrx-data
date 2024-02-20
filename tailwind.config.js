/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00A7E4CC",
        secondary: "#68CC27CC",
        accent: "#f59e0b",
        neutral: "#f4f5f7",
        info: "#2563eb",
        success: "#22c55e",
        warning: "#fde047",
        error: "#ef4444",
      },
    },
  },
  plugins: [],
}

