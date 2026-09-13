/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080A10",
          900: "#0B0E16",
          800: "#111524",
          700: "#171C30",
          600: "#232A46",
        },
        mist: {
          400: "#8B92AC",
          300: "#AEB4C9",
          100: "#EDEBE4",
        },
        signal: {
          violet: "#8477F2",
          indigo: "#5B63D6",
          cyan: "#5FD9CE",
          amber: "#E7B770",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(132, 119, 242, 0.45)",
        "glow-cyan": "0 0 50px -15px rgba(95, 217, 206, 0.4)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-18px,0)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        "spin-slower": "spin-slow 70s linear infinite",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
