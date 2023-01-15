/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    // this ensures that 'xs' gets inserted before the other breakpoints in the css order
    screens: { xs: '480px', ...defaultTheme?.screens },
    extend: {
      fontFamily: {
        title: ['Lato', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors() {
            const primary = {
              DEFAULT: '',
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
            primary.DEFAULT = primary[800]
            return {
              primary,
              secondary: colors.amber,
              success: colors.green[500],
              warning: colors.yellow[400],
              danger: colors.red[500],
              surface: {
                base: {
                  DEFAULT: 'white',
                  elevation: {
                    100: 'white',
                    200: 'white',
                    300: 'white'
                  }
                },
                offBase: colors.gray[200],
                brand: primary.DEFAULT,
                primary: primary[100],
                active: primary[100],
                success: colors.green[100],
                warning: colors.yellow[50],
                danger: colors.red[100]
              },
              on: {
                surface: {
                  base: {
                    DEFAULT: colors.zinc[800],
                    muted: colors.zinc[600]
                  },
                  offBase: {
                    DEFAULT: colors.zinc[800],
                    muted: colors.zinc[600]
                  },
                  brand: primary[100],
                  primary: primary[900],
                  active: colors.zinc[900],
                  success: colors.green[900],
                  warning: colors.yellow[900],
                  danger: colors.red[900]
                }
              },
              borderColor: {
                DEFAULT: colors.zinc[300],
                focus: primary.DEFAULT,
                primary: primary[200],
                success: colors.green[200],
                warning: colors.yellow[200],
                danger: colors.red[200]
              },
              ringColor: {
                focus: primary.DEFAULT
              },
              icon: colors.zinc[400]
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
                DEFAULT: '',
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
              primary.DEFAULT = primary[500]
              return {
                primary,
                secondary: colors.amber,
                success: colors.green[500],
                warning: colors.yellow[500],
                danger: colors.red[500],
                surface: {
                  base: {
                    DEFAULT: colors.zinc[900],
                    elevation: {
                      100: '#1D1D23',
                      200: '#1E2026',
                      300: '#1F2128'
                    }
                  },
                  offBase: colors.gray[800],
                  brand: primary[800],
                  primary: '#1f2330', // primary[900] @ 50% opacity on colors.zinc[900]
                  active: primary[900],
                  success: '#172a21', // colors.green[800] @ 30% opacity on colors.zinc[900]
                  warning: '#392817', // colors.yellow[800] @ 50% opacity on colors.zinc[900]
                  danger: '#371a1c' // colors.red[900] @ 50% opacity on colors.zinc[900]
                },
                on: {
                  surface: {
                    base: {
                      DEFAULT: colors.zinc[300],
                      muted: colors.zinc[400]
                    },
                    offBase: {
                      DEFAULT: colors.zinc[300],
                      muted: colors.zinc[400]
                    },
                    brand: primary[100],
                    primary: primary[100],
                    active: primary[100],
                    success: colors.green[200],
                    warning: colors.yellow[200],
                    danger: colors.red[200]
                  }
                },
                borderColor: {
                  DEFAULT: colors.zinc[700],
                  focus: primary.DEFAULT,
                  primary: primary[900],
                  success: colors.green[900],
                  warning: colors.yellow[900],
                  danger: '#5a1b1d' // colors.red[900] @ 50% opacity on colors.zinc[900]
                },
                ringColor: {
                  focus: primary.DEFAULT
                },
                icon: colors.zinc[600]
              }
            }
          }
        }
      ]
    })
  ]
}
