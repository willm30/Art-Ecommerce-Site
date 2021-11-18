module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins:
        'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      secular:
        '"Secular One", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      ogirema:
        'Ogirema, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      copperplate:
        'CopperplateRegular, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
    maxWidth: {
      32: "8rem",
    },
    flex: {
      5: "1 1 5%",
      10: "1 1 10%",
      15: "1 1 15%",
      20: "1 1 20%",
      25: "1 1 25%",
      30: "1 1 30%",
      33: "1 1 33.33%",
      40: "1 1 40%",
      50: "1 1 50%",
      60: "1 1 60%",
      70: "1 1 70%",
      80: "1 1 80%",
      85: "1 1 85%",
      90: "1 1 90%",
      100: "1 1 100%",
    },
    extend: {
      gridTemplateRows: {
        feature: "10vh 1fr",
        all: "10vh, 1fr, 10vh",
      },
      gridTemplateColumns: {
        feature: "0.1fr 1fr",
        ind: "0.75fr 1fr 0.5fr",
        all: "1fr",
      },
      outline: {
        mini: "4px solid black",
        ind: "12px solid black",
      },
      animation: {
        nav: "grow 10s linear forwards",
        cartItemMini: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      keyframes: {
        grow: {
          "0%": { borderRadius: "0px" },
          "100%": { borderRadius: "9999px" },
        },
        slideIn: {
          "0%": { right: "-15rem" },
          "100%": { right: "5rem" },
        },
      },
      transitionProperty: {
        left: "left",
        w: "width",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
      backgroundColor: ["hover"],
      cursor: ["hover"],
    },
  },
  plugins: [],
};
