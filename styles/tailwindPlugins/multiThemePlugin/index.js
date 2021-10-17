/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
const {
  transformAllSelectors,
  updateLastClasses
} = require('tailwindcss/lib/util/pluginUtils')
const prefixSelector = require('tailwindcss/lib/util/prefixSelector').default

const {
  resolveThemeAsBaseConfig,
  resolveThemeAsCustomProps
} = require('./utils')

const defaultThemeName = 'DEFAULT'

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
  Object.entries(themes).forEach(([themeName, themeConfig]) =>
    addBase({
      [themeName === defaultThemeName ? ':root' : `.${e(themeName)}`]:
        resolveThemeAsCustomProps(themeConfig)
    })
  )

module.exports = plugin.withOptions(
  options => helpers => {
    addThemeVariants(options, helpers)
    addThemeStyles(options, helpers)
  },
  options => {
    if (!options[defaultThemeName]) {
      throw new Error(
        `No ${defaultThemeName} theme set for the multiThemePlugin. Theming won't work unless values are set for the default theme.`
      )
    }

    return {
      theme: {
        extend: resolveThemeAsBaseConfig(options[defaultThemeName])
      }
    }
  }
)
