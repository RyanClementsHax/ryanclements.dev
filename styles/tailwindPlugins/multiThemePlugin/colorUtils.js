/* eslint-disable @typescript-eslint/no-var-requires */
const Color = require('color')

const toKebabCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

const toRgb = value => {
  const [r, g, b] = Color(value).rgb().array()
  return `${r}, ${g}, ${b}`
}

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

const isColor = string => {
  try {
    Color(string)
    return true
  } catch {
    return false
  }
}

module.exports.toKebabCase = toKebabCase
module.exports.toRgb = toRgb
module.exports.withOpacity = withOpacity
module.exports.isColor = isColor
