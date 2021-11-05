/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('./styles/tailwindPlugins/multiThemePlugin')({
      defaultTheme: {
        extend: {
          colors: {
            background: 'white'
          }
        }
      },
      themes: [
        {
          name: 'dark',
          extend: {
            colors: {
              background: colors.gray[900]
            }
          }
        }
      ]
    })
  ]
}
