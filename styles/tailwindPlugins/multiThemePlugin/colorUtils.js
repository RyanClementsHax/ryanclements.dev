//@ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const Color = require('color')

/**
 * @param {string} value - a color represented as a string (hex, rgb, rgba, hsl, hsla, etc)
 * @return {string} the color represented as its rgb values with alpha channel stripped
 */
const toRgb = value => {
  const [r, g, b] = Color(value).rgb().array()
  return `${r}, ${g}, ${b}`
}

/**
 * @param {string} customPropName - a custom prop to configure with opacity
 * @return {({ opacityVariable, opacityValue }: { opacityVariable?: string, opacityValue?: string }) => string} the variable configured with opacity
 */
const withOpacity =
  customPropName =>
  ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${customPropName}), ${opacityValue})`
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${customPropName}), var(${opacityVariable}, 1))`
    }
    return `rgb(var(${customPropName}))`
  }

/**
 * @param {string | number} value - the value to test if it is a valid color string
 * @return {boolean} whether the value passed in is a valid color string
 */
const isColor = value => {
  if (typeof value === 'number') {
    return false
  }
  try {
    Color(value)
    return true
  } catch {
    return false
  }
}

module.exports.toRgb = toRgb
module.exports.withOpacity = withOpacity
module.exports.isColor = isColor
