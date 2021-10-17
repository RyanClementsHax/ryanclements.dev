/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [
    require('./styles/tailwindPlugins/multiThemePlugin')({
      DEFAULT: {
        colors: {
          primary: 'orange'
        }
      },
      dark: {
        colors: {
          primary: 'purple'
        }
      }
    })
  ]
}
