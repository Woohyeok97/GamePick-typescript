
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#ffffff",
        bgGray: "#f2f4f6",
        fontColor: "#191f28",
        fontGray: "#8b95a1",
        fontDarkGray: "#4e5968",
        fontWhite: "#f9fafb",
        fontWarning: "#ff5655",
        fontWarningHover: "#f56666",
        btnColor: "#3182f6",
        btnColorHover: "#1b64da",
      },
      transitionProperty: {
        'default': 'all',
      },
      transitionDuration: {
        'default': '200ms',
      },
      transitionTimingFunction: {
        'default': 'ease-in',
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out forwards',
        slideDown: 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        slideDown: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;