/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
const {
  transformAllSelectors,
  updateLastClasses
} = require('tailwindcss/lib/util/pluginUtils')
const prefixSelector = require('tailwindcss/lib/util/prefixSelector').default

const {
  resolveThemesAsTailwindConfig,
  resolveThemeExtensionAsCustomProps
} = require('./utils')

const defaultThemeName = 'default'

const getThemesFromOptions = ({ defaultTheme, themes }) => [
  {
    ...defaultTheme,
    name: defaultThemeName
  },
  ...themes
]

// I copied the way tailwind does dark themeing internally, but modified it to handle any theme name
// It is on the developer to make sure the theme name doesn't conflict with any other variants
const addThemeVariants = (themes, { addVariant, config }) =>
  Object.entries(themes).map(([themeName]) =>
    addVariant(
      themeName,
      transformAllSelectors(selector => {
        let variantSelector = updateLastClasses(selector, className => {
          return `${themeName}${config('separator')}${className}`
        })

        if (variantSelector === selector) {
          return null
        }

        let themeSelector = prefixSelector(config('prefix'), `.${themeName}`)

        return `${themeSelector} ${variantSelector}`
      })
    )
  )

const addThemeStyles = (themes, { addBase, e }) =>
  themes.forEach(({ name, extend }) =>
    addBase({
      [name === defaultThemeName ? ':root' : `.${e(name)}`]:
        resolveThemeExtensionAsCustomProps(extend)
    })
  )

module.exports = plugin.withOptions(
  options => helpers => {
    const themes = getThemesFromOptions(options)
    addThemeVariants(themes, helpers)
    addThemeStyles(themes, helpers)
  },
  options => ({
    theme: {
      extend: resolveThemesAsTailwindConfig(getThemesFromOptions(options))
    }
  })
)
