//@ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('lodash')
const {
  asCustomProp,
  toCustomPropName,
  toCustomPropValue
} = require('./customPropUtils')

/**
 * @typedef {import('tailwindcss').Theme} Theme
 * @typedef {import('tailwindcss').TailwindExtension} TailwindExtension
 * @typedef {import('tailwindcss/plugin').Helpers} Helpers
 * @typedef {import('./optionsUtils').ThemeConfig} ThemeConfig
 */

/**
 * @param {(theme: Theme) => any} value - the theme callback
 * @param {string[]} valuePath - the path to the value
 * @return {(theme: Theme) => any} a function that will resolve the theme extension provided by the callback when given the tailwind theme helper
 */
const toThemeExtensionResolverCallback = (value, valuePath) => theme => {
  const config = value(theme)
  return toTailwindExtension(config, valuePath)
}

/**
 * @param {TailwindExtension[keyof TailwindExtension]} theme - the theme config to convert to a tailwind extension
 * @param {string[]} prevPathSteps - the theme config to convert to a tailwind extension
 * @return {TailwindExtension} the resolved tailwind extension from the given theme
 */
const toTailwindExtension = (theme, prevPathSteps = []) =>
  Object.entries(theme).reduce((acc, [key, value]) => {
    const valuePath = [...prevPathSteps, key]
    return {
      ...acc,
      [key]:
        typeof value === 'object'
          ? toTailwindExtension(value, valuePath)
          : typeof value === 'function'
          ? toThemeExtensionResolverCallback(value, valuePath)
          : asCustomProp(value, valuePath)
    }
  }, {})

/**
 * @param {ThemeConfig[]} themes - the themes to convert to a tailwind extension
 * @return {TailwindExtension} the resolved tailwind extension from the given theme
 */
const resolveThemeExtensionsAsTailwindExtension = themes => {
  const mergedThemeExtension = merge({}, ...themes.map(x => x.extend))
  return toTailwindExtension(mergedThemeExtension)
}

/**
 * @param {TailwindExtension[keyof TailwindExtension]} themeExtension - the theme to convert to custom props
 * @param {Helpers} helpers - the tailwind plugin helpers
 * @param {string[]} prevPathSteps - the tailwind plugin helpers
 * @return {{ [key: string]: string }} the theme resolved as custom props
 */
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
