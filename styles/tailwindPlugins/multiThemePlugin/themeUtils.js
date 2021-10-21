//@ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('lodash')
const {
  asCustomProp,
  toCustomPropName,
  toCustomPropValue
} = require('./customPropUtils')

/**
 * @template T
 * @typedef {import('tailwindcss').ThemeCb<T>} ThemeCb
 *
 */
/**
 * @template T
 * @typedef {import('tailwindcss').WithThemeCb<T>} WithThemeCb
 */
/**
 * @typedef {import('tailwindcss').ColorConfig} ColorConfig
 * @typedef {import('tailwindcss').TailwindExtension} TailwindExtension
 * @typedef {import('tailwindcss').TailwindValue} TailwindValue
 * @typedef {import('tailwindcss/plugin').Helpers} Helpers
 * @typedef {import('./optionsUtils').ThemeConfig} ThemeConfig
 */

/**
 * @param {ThemeCb<TailwindValue>} value - the theme callback
 * @param {string[]} valuePath - the path to the value
 * @return {ThemeCb<TailwindValue>} a function that will resolve the theme extension provided by the callback when given the tailwind theme helper
 */
const toThemeExtensionResolverCallback = (value, valuePath) => theme => {
  const config = value(theme)
  return resolveThemeExtensionsAsTailwindExtensionRecursionHelper(
    config,
    valuePath
  )
}

/**
 * @template {TailwindExtension | WithThemeCb<TailwindValue> | WithThemeCb<ColorConfig>} T
 * @param {T} themeExtensionValue - the theme config to convert to a tailwind extension
 * @param {string[]} prevPathSteps - the theme config to convert to a tailwind extension
 * @return {T extends TailwindValue ? TailwindValue : T extends ColorConfig ? ColorConfig : T extends TailwindExtension ? TailwindExtension : T extends WithThemeCb<ColorConfig> ? WithThemeCb<ColorConfig> : WithThemeCb<TailwindValue>} the resolved tailwind extension from the given theme
 */
const resolveThemeExtensionsAsTailwindExtensionRecursionHelper = (
  themeExtensionValue,
  prevPathSteps = []
) =>
  Array.isArray(themeExtensionValue)
    ? themeExtensionValue.map((x, i) =>
        resolveThemeExtensionsAsTailwindExtensionRecursionHelper(x, [
          ...prevPathSteps,
          i.toString()
        ])
      )
    : typeof themeExtensionValue === 'function'
    ? (() => {
        if (prevPathSteps.length === 1) {
          return toThemeExtensionResolverCallback(
            /** @type {ThemeCb<TailwindValue>} */ (themeExtensionValue),
            prevPathSteps
          )
        } else {
          throw new Error(
            `callback found on path "${prevPathSteps.join(
              '.'
            )}" and they are only allowed at the top level or for color opacity configuration`
          )
        }
      })()
    : typeof themeExtensionValue === 'object'
    ? Object.entries(themeExtensionValue).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: resolveThemeExtensionsAsTailwindExtensionRecursionHelper(
            value,
            [...prevPathSteps, key]
          )
        }),
        {}
      )
    : asCustomProp(themeExtensionValue, prevPathSteps)

/**
 * @param {ThemeConfig[]} themes - the themes to convert to a tailwind extension
 * @return {TailwindExtension} the resolved tailwind extension from the given theme
 */
const resolveThemeExtensionsAsTailwindExtension = themes => {
  /** @type {TailwindExtension} */
  const mergedThemeExtension = merge({}, ...themes.map(x => x.extend))
  return resolveThemeExtensionsAsTailwindExtensionRecursionHelper(
    mergedThemeExtension
  )
}

/**
 * @param {TailwindExtension | WithThemeCb<TailwindValue> | WithThemeCb<ColorConfig>} themeExtensionValue - the theme extension value to convert to custom props
 * @param {Helpers} helpers - the tailwind plugin helpers
 * @param {string[]} prevPathSteps - the tailwind plugin helpers
 * @return {{ [key: string]: string }} the theme extension value resolved as custom props
 */
const resolveThemeExtensionAsCustomPropsRecursionHelper = (
  themeExtensionValue,
  helpers,
  prevPathSteps = []
) =>
  Array.isArray(themeExtensionValue)
    ? themeExtensionValue
        .map((x, i) =>
          resolveThemeExtensionAsCustomPropsRecursionHelper(x, helpers, [
            ...prevPathSteps,
            i.toString()
          ])
        )
        .reduce((acc, curr) => ({ ...acc, ...curr }), {})
    : typeof themeExtensionValue === 'function'
    ? resolveThemeExtensionAsCustomPropsRecursionHelper(
        themeExtensionValue(helpers.theme),
        helpers,
        prevPathSteps
      )
    : typeof themeExtensionValue === 'object'
    ? Object.entries(themeExtensionValue).reduce(
        (acc, [key, value]) => ({
          ...acc,
          ...resolveThemeExtensionAsCustomPropsRecursionHelper(value, helpers, [
            ...prevPathSteps,
            key
          ])
        }),
        {}
      )
    : {
        [toCustomPropName(prevPathSteps)]:
          toCustomPropValue(themeExtensionValue)
      }

/**
 * @param {TailwindExtension} themeExtension - the theme extension to convert to custom props
 * @param {Helpers} helpers - the tailwind plugin helpers
 * @return {{ [key: string]: string }} the theme extension resolved as custom props
 */
const resolveThemeExtensionAsCustomProps = (themeExtension, helpers) =>
  resolveThemeExtensionAsCustomPropsRecursionHelper(themeExtension, helpers)

module.exports.resolveThemeExtensionsAsTailwindExtension =
  resolveThemeExtensionsAsTailwindExtension
module.exports.resolveThemeExtensionAsCustomProps =
  resolveThemeExtensionAsCustomProps
