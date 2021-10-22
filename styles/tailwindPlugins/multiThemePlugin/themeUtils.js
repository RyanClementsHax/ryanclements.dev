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
 */
/**
 * @typedef {import('tailwindcss').TailwindExtension} TailwindExtension
 * @typedef {import('tailwindcss/plugin').Helpers} Helpers
 * @typedef {import('./optionsUtils').ThemeConfig} ThemeConfig
 */

/**
 * @template T
 * @param {ThemeCb<T>} value - the theme callback
 * @param {string[]} valuePath - the path to the value
 * @return {ThemeCb<T>} a function that will resolve the theme extension provided by the callback when given the tailwind theme helper
 */
const toThemeExtensionResolverCallback = (value, valuePath) => theme => {
  const config = value(theme)
  return resolveThemeExtensionsAsTailwindExtensionRecursionHelper(
    config,
    valuePath
  )
}

/**
 * @param {any} themeExtensionValue - the value to convert to a tailwind extension
 * @param {string[]} pathSteps - the path to the value
 * @return {any} the resolved tailwind extension from the given theme
 * @throws {Error} if any callbacks are found in places not supported by tailwind
 */
const resolveThemeExtensionsAsTailwindExtensionRecursionHelper = (
  themeExtensionValue,
  pathSteps = []
) =>
  typeof themeExtensionValue === 'undefined' || themeExtensionValue === null
    ? themeExtensionValue
    : Array.isArray(themeExtensionValue)
    ? themeExtensionValue.map((x, i) =>
        resolveThemeExtensionsAsTailwindExtensionRecursionHelper(x, [
          ...pathSteps,
          i.toString()
        ])
      )
    : typeof themeExtensionValue === 'function'
    ? (() => {
        if (pathSteps.length === 1) {
          return toThemeExtensionResolverCallback(
            themeExtensionValue,
            pathSteps
          )
        } else {
          throw new Error(
            `callback found on path "${pathSteps.join(
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
            [...pathSteps, key]
          )
        }),
        {}
      )
    : asCustomProp(themeExtensionValue, pathSteps)

/**
 * @param {ThemeConfig[]} themes - the themes to convert to a tailwind extension
 * @return {TailwindExtension} the resolved tailwind extension from the given theme
 * @throws {Error} if any callbacks are found in places not supported by tailwind
 */
const resolveThemeExtensionsAsTailwindExtension = themes => {
  /** @type {TailwindExtension} */
  const mergedThemeExtension = merge({}, ...themes.map(x => x.extend))
  return resolveThemeExtensionsAsTailwindExtensionRecursionHelper(
    mergedThemeExtension
  )
}

/**
 * @param {any} themeExtensionValue - the value to convert to custom props
 * @param {Helpers} helpers - the tailwind plugin helpers
 * @param {string[]} pathSteps - the path to the value
 * @return {{ [key: string]: string }} the theme extension value resolved as custom props
 */
const resolveThemeExtensionAsCustomPropsRecursionHelper = (
  themeExtensionValue,
  helpers,
  pathSteps = []
) =>
  Array.isArray(themeExtensionValue)
    ? themeExtensionValue
        .map((x, i) =>
          resolveThemeExtensionAsCustomPropsRecursionHelper(x, helpers, [
            ...pathSteps,
            i.toString()
          ])
        )
        .reduce((acc, curr) => ({ ...acc, ...curr }), {})
    : typeof themeExtensionValue === 'function'
    ? resolveThemeExtensionAsCustomPropsRecursionHelper(
        themeExtensionValue(helpers.theme),
        helpers,
        pathSteps
      )
    : typeof themeExtensionValue === 'object'
    ? Object.entries(themeExtensionValue).reduce(
        (acc, [key, value]) => ({
          ...acc,
          ...resolveThemeExtensionAsCustomPropsRecursionHelper(value, helpers, [
            ...pathSteps,
            key
          ])
        }),
        {}
      )
    : {
        [toCustomPropName(pathSteps)]: toCustomPropValue(themeExtensionValue)
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
