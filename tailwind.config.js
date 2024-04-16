/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        backgroundImage: {
          'diagonal-stripes-light': 'repeating-linear-gradient(115deg, #bcd4ec, #bcd4ec 1.5px, #ccdcf3 1.5px, #ccdcf3 3px)',
          'diagonal-stripes-dark': 'repeating-linear-gradient(115deg, #acc4e3, #acc4e3 1.5px, #bcd4ec 1.5px, #bcd4ec 3px)'
        },
        colors: {
          'dark-blue': '#6879a6',
          'background-blue': '#ddeeff',
          'light-blue': '#ccdcf3',
          'hover-dark-blue': '#484c6c',
          'hover-light-blue': '#a8c4ec'
        },
        fontFamily: {
          angies: 'Angies-New-House',
          objectivityBold: 'Objectivity-Bold'
        }
      }
    },
    plugins: [],
  }
  