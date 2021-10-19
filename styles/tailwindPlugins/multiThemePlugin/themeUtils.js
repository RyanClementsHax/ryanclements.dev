/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('lodash')
const {
  asCustomProp,
  toCustomPropName,
  toCustomPropValue
} = require('./customPropUtils')

const toThemeCallback = (value, valuePath) => theme => {
  const config = value(theme)
  return toTailwindExtension(config, valuePath)
}

const toTailwindExtension = (theme, prevPathSteps = []) =>
  Object.entries(theme).reduce((acc, [key, value]) => {
    const valuePath = [...prevPathSteps, key]
    return {
      ...acc,
      [key]:
        typeof value === 'object'
          ? toTailwindExtension(value, valuePath)
          : typeof value === 'function'
          ? toThemeCallback(value, valuePath)
          : asCustomProp(value, valuePath)
    }
  }, {})

const resolveThemeExtensionsAsTailwindExtension = themes => {
  const mergedThemeExtension = merge({}, ...themes.map(x => x.extend))
  return toTailwindExtension(mergedThemeExtension)
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
        : { [toCustomPropName(valuePath)]: toCustomPropValue(value) })
    }
  }, {})

module.exports.resolveThemeExtensionsAsTailwindExtension =
  resolveThemeExtensionsAsTailwindExtension
module.exports.resolveThemeExtensionAsCustomProps =
  resolveThemeExtensionAsCustomProps
