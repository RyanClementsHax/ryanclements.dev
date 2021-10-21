//@ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('./styles/tailwindPlugins/multiThemePlugin')({
      defaultTheme: {
        extend: {
          colors: {
            primary: 'orange'
          },
          foo: theme => ({
            bar1: theme('colors.red.500')
          })
        }
      },
      themes: [
        {
          name: 'dark',
          extend: {
            colors: {
              primary: 'purple'
            },
            foo: theme => ({
              bar2: theme('colors.primary')
            }),
            bazz: {
              DEFAULT: 'thing',
              buzz: 'vict'
            }
          }
        }
      ]
    })
  ]
}
