const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.js" ],
  theme: { extend: {
    fontFamily: { sans: [ "Inter", ...defaultTheme.fontFamily.sans ] }, 
    colors: {
      background: "#121212",
      search: "#34323D",
      "search-background": "#232228",
      "active-background": "#353340",
      navigation: "#BEBEBE" 
      // haha, bebe
}}}}