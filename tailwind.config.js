/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
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
          }
        }
      },
      themes: [
        {
          name: 'dark',
          extend: {
            colors: {
              primary: 'purple',
              foo: 'bar'
            },
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
