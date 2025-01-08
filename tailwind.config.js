/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#F37021",
        },
        background: {
          DEFAULT: "#eeece2",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        nsjpthin: ["NotoSansJP-Thin", "sans-serif"],
        nsjplight: ["NotoSansJP-Light", "sans-serif"],
        nsjpregular: ["NotoSansJP-Regular", "sans-serif"],
        nsjpmedium: ["NotoSansJP-Medium", "sans-serif"],
        nsjpsemibold: ["NotoSansJP-SemiBold", "sans-serif"],
        nsjpbold: ["NotoSansJP-Bold", "sans-serif"],
        nsjpextrabold: ["NotoSansJP-ExtraBold", "sans-serif"],
        nsjpblack: ["NotoSansJP-Black", "sans-serif"],
        nsjpregular: ["NotoSansJP-Regular", "sans-serif"],
        nskrthin: ["NotoSansKR-Thin", "sans-serif"],
        nskrlight: ["NotoSansKR-Light", "sans-serif"],
        nskrregular: ["NotoSansKR-Regular", "sans-serif"],
        nskrmedium: ["NotoSansKR-Medium", "sans-serif"],
        nskrsemibold: ["NotoSansKR-SemiBold", "sans-serif"],
        nskrbold: ["NotoSansKR-Bold", "sans-serif"],
        nskrextrabold: ["NotoSansKR-ExtraBold", "sans-serif"],
        nskrblack: ["NotoSansKR-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
