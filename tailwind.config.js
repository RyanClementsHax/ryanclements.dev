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
      themes: [
        {
          name: 'default',
          extend: {
            colors: {
              primary: 'orange'
            }
          }
        },
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
