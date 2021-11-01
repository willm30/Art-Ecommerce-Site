module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins:
        'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      secular:
        'Secular One, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    maxWidth: {
      32: "8rem",
    },
    flex: {
      logo: "1 1 20%",
      nav: "1 1 80%",
      header: "1 1 100%",
      "header-btn": "1 1 15%",
      "header-h1": "1 1 85%",
    },
    extend: {
      gridTemplateRows: {
        feature: "0.5fr 0.25fr repeat(3, 1fr) 0.25fr",
      },
      gridTemplateColumns: {
        feature: "0.1fr 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
