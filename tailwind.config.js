/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: [
    "bg-mint",
    "bg-blue",
    "bg-purple",
    "bg-coral",
    "bg-yellow",
    "bg-mint/10",
    "bg-blue/10",
    "bg-purple/10",
    "bg-coral/10",
    "bg-yellow/10",
    "bg-mint/20",
    "bg-blue/20",
    "bg-purple/20",
    "bg-coral/20",
    "bg-yellow/20",
    "text-mint",
    "text-blue",
    "text-purple",
    "text-coral",
    "text-yellow",
  ],
  theme: {
    extend: {
      colors: {
        mint: "#4CC9A0",
        blue: "#5B8DEF",
        purple: "#A78BFA",
        coral: "#FF7D7D",
        yellow: "#FFC857",
        ink: "#17202A",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(30, 42, 62, 0.10)",
        lift: "0 12px 26px rgba(91, 141, 239, 0.16)",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
