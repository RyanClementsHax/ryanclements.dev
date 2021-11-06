/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

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
          colors() {
            const primary = {
              50: '#EEF1FC',
              100: '#DCE3F9',
              200: '#CBD5F6',
              300: '#A8B9F0',
              400: '#859DEA',
              500: '#6280E4',
              600: '#3F64DE',
              700: '#234CD1',
              800: '#1E40AF',
              900: '#18338C'
            }
            const defaultPrimary = primary[800]
            return {
              primary,
              surface: {
                DEFAULT: 'white',
                active: primary[100]
              },
              on: {
                surface: {
                  DEFAULT: colors.gray[800],
                  muted: colors.gray[600],
                  active: primary[900]
                }
              },
              'border-color': colors.gray[300],
              'focus-color': {
                ring: defaultPrimary,
                border: defaultPrimary
              },
              icon: {
                DEFAULT: colors.gray[400],
                primary: defaultPrimary
              }
            }
          }
        }
      },
      themes: [
        {
          name: 'dark',
          extend: {
            colors() {
              const primary = {
                50: '#F1F3F8',
                100: '#E3E7F2',
                200: '#C8CEE5',
                300: '#ACB6D8',
                400: '#8695C6',
                500: '#7485BE',
                600: '#596DB1',
                700: '#485B99',
                800: '#3B4A7D',
                900: '#2E3A61'
              }
              const defaultPrimary = primary[500]
              return {
                primary,
                surface: {
                  DEFAULT: colors.gray[900],
                  active: primary[900]
                },
                on: {
                  surface: {
                    DEFAULT: colors.gray[300],
                    muted: colors.gray[500],
                    active: primary[100]
                  }
                },
                border_color: colors.gray[700],
                focus_color: {
                  ring: defaultPrimary,
                  border: defaultPrimary
                },
                icon: {
                  DEFAULT: colors.gray[600],
                  primary: defaultPrimary
                }
              }
            }
          }
        }
      ]
    })
  ]
}
