/* eslint-disable @typescript-eslint/no-var-requires */
const { isColor, toRgb, toKebabCase, withOpacity } = require('./colorUtils')

const toCustomPropValue = value => {
  if (isColor(value)) {
    return toRgb(value)
  } else {
    return value
  }
}

const toCustomPropName = valuePath =>
  `--${valuePath
    .filter(step => step.toLowerCase() !== 'default')
    .map(toKebabCase)
    .join('-')}`

const asCustomProp = (value, valuePath) => {
  const customPropName = toCustomPropName(valuePath)
  if (isColor(value)) {
    return withOpacity(customPropName)
  } else {
    return `var(${customPropName})`
  }
}

module.exports.toCustomPropValue = toCustomPropValue
module.exports.toCustomPropName = toCustomPropName
module.exports.asCustomProp = asCustomProp
