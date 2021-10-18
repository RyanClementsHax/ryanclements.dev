/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('lodash')
const {
  asCustomProp,
  createCustomPropName,
  createCustomPropValue
} = require('./customPropUtils')

const defaultThemeName = 'default'

const getThemesFromOptions = ({ defaultTheme, themes = [] }) => [
  {
    extend: {},
    ...defaultTheme,
    name: defaultThemeName
  },
  ...themes.map(x => {
    if (!x.name) {
      throw new Error(
        'Every theme in the themes array in the multiThemePlugin options must have a name property set to a unique string'
      )
    } else {
      return { extend: {}, ...x }
    }
  })
]

const toThemeCallback = (value, valuePath) => theme => {
  const config = value(theme)
  return toBaseConfig(config, valuePath)
}

const toBaseConfig = (theme, prevPathSteps = []) =>
  Object.entries(theme).reduce((acc, [key, value]) => {
    const valuePath = [...prevPathSteps, key]
    return {
      ...acc,
      [key]:
        typeof value === 'object'
          ? toBaseConfig(value, valuePath)
          : typeof value === 'function'
          ? toThemeCallback(value, valuePath)
          : asCustomProp(value, valuePath)
    }
  }, {})

const resolveThemesAsTailwindConfig = themes => {
  const mergedTheme = merge({}, ...themes.map(x => x.extend))
  return toBaseConfig(mergedTheme)
}

const resolveThemeExtensionAsCustomProps = (
  themeExtension,
  helpers,
  prevPathSteps = []
) =>
  Object.entries(themeExtension).reduce((acc, [key, value]) => {
    const valuePath = [...prevPathSteps, key]
    return {
      ...acc,
      ...(typeof value === 'object'
        ? resolveThemeExtensionAsCustomProps(value, helpers, valuePath)
        : typeof value === 'function'
        ? resolveThemeExtensionAsCustomProps(
            value(helpers.theme),
            helpers,
            valuePath
          )
        : { [createCustomPropName(valuePath)]: createCustomPropValue(value) })
    }
  }, {})

module.exports.defaultThemeName = defaultThemeName
module.exports.getThemesFromOptions = getThemesFromOptions
module.exports.resolveThemesAsTailwindConfig = resolveThemesAsTailwindConfig
module.exports.resolveThemeExtensionAsCustomProps =
  resolveThemeExtensionAsCustomProps
