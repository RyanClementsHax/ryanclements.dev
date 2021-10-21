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
 * @typedef {import('tailwindcss').ThemeCallback} ThemeCallback
 * @typedef {import('tailwindcss').TailwindExtension} TailwindExtension
 * @typedef {import('tailwindcss').TailwindExtensionValue} TailwindExtensionValue
 * @typedef {import('tailwindcss').TailwindExtensionTopLevelValue} TailwindExtensionTopLevelValue
 * @typedef {import('tailwindcss/plugin').Helpers} Helpers
 * @typedef {import('./optionsUtils').ThemeConfig} ThemeConfig
 */

/**
 * @param {ThemeCallback} value - the theme callback
 * @param {string[]} valuePath - the path to the value
 * @return {ThemeCallback} a function that will resolve the theme extension provided by the callback when given the tailwind theme helper
 */
const toThemeExtensionResolverCallback = (value, valuePath) => theme => {
  const config = value(theme)
  return toTailwindExtension(config, valuePath)
}

/**
 * @template T
 * @param {T} theme - the theme config to convert to a tailwind extension
 * @param {string[]} prevPathSteps - the theme config to convert to a tailwind extension
 * @return {T extends TailwindExtensionValue ? TailwindExtensionValue : T extends TailwindExtensionTopLevelValue ? TailwindExtensionTopLevelValue : TailwindExtension} the resolved tailwind extension from the given theme
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
  /** @type {TailwindExtension} */
  const mergedThemeExtension = merge({}, ...themes.map(x => x.extend))
  return toTailwindExtension(mergedThemeExtension)
}

/**
 * @param {TailwindExtension | TailwindExtensionTopLevelValue} themeExtensionValue - the theme to convert to custom props
 * @param {Helpers} helpers - the tailwind plugin helpers
 * @param {string[]} prevPathSteps - the tailwind plugin helpers
 * @return {{ [key: string]: string }} the theme resolved as custom props
 */
const resolveThemeExtensionAsCustomPropsRecursionHelper = (
  themeExtensionValue,
  helpers,
  prevPathSteps = []
) =>
  Object.entries(themeExtensionValue).reduce((acc, [key, value]) => {
    const valuePath = [...prevPathSteps, key]
    return {
      ...acc,
      ...(typeof value === 'object'
        ? resolveThemeExtensionAsCustomPropsRecursionHelper(
            value,
            helpers,
            valuePath
          )
        : typeof value === 'function'
        ? resolveThemeExtensionAsCustomPropsRecursionHelper(
            value(helpers.theme),
            helpers,
            valuePath
          )
        : { [toCustomPropName(valuePath)]: toCustomPropValue(value) })
    }
  }, {})

/**
 * @param {TailwindExtension} themeExtension - the theme to convert to custom props
 * @param {Helpers} helpers - the tailwind plugin helpers
 * @return {{ [key: string]: string }} the theme resolved as custom props
 */
const resolveThemeExtensionAsCustomProps = (themeExtension, helpers) =>
  resolveThemeExtensionAsCustomPropsRecursionHelper(themeExtension, helpers)

module.exports.resolveThemeExtensionsAsTailwindExtension =
  resolveThemeExtensionsAsTailwindExtension
module.exports.resolveThemeExtensionAsCustomProps =
  resolveThemeExtensionAsCustomProps
