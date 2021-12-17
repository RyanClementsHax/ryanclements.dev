/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [
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
              surface: {
                base: {
                  DEFAULT: 'white',
                  elevation: {
                    100: 'white'
                  }
                },
                active: primary[100]
              },
              on: {
                surface: {
                  base: {
                    DEFAULT: colors.gray[800],
                    muted: colors.gray[600]
                  },
                  active: colors.gray[900]
                }
              },
              borderColor: {
                DEFAULT: colors.gray[300],
                focus: primary.DEFAULT
              },
              ringColor: {
                focus: primary.DEFAULT
              },
              icon: colors.gray[400]
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
                surface: {
                  base: {
                    DEFAULT: colors.gray[900],
                    elevation: {
                      100: '#1E1E24'
                    }
                  },
                  active: primary[900]
                },
                on: {
                  surface: {
                    base: {
                      DEFAULT: colors.gray[300],
                      muted: colors.gray[400]
                    },
                    active: primary[100]
                  }
                },
                borderColor: {
                  DEFAULT: colors.gray[700],
                  focus: primary.DEFAULT
                },
                ringColor: {
                  focus: primary.DEFAULT
                },
                icon: colors.gray[600]
              }
            }
          }
        }
      ]
    })
  ]
}
