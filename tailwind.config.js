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
            primary: 'orange',
            secondary: 'red'
          }
        }
      },
      themes: [
        {
          name: 'dark',
          extend: {
            colors: {
              primary: 'purple'
            }
          }
        },
        {
          name: 'neon',
          extend: {}
        }
      ]
    })
  ]
}
