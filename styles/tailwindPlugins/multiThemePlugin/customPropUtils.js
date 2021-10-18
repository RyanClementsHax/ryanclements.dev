/* eslint-disable @typescript-eslint/no-var-requires */
const { isColor, asRgb, toKebabCase, withOpacity } = require('./colorUtils')

const createCustomPropValue = value => {
  if (isColor(value)) {
    return asRgb(value)
  } else {
    return value
  }
}

const createCustomPropName = valuePath =>
  `--${valuePath
    .filter(step => step.toLowerCase() !== 'default')
    .map(toKebabCase)
    .join('-')}`

const asCustomProp = (value, valuePath) => {
  const customPropName = createCustomPropName(valuePath)
  if (isColor(value)) {
    return withOpacity(customPropName)
  } else {
    return `var(${customPropName})`
  }
}

module.exports.createCustomPropValue = createCustomPropValue
module.exports.createCustomPropName = createCustomPropName
module.exports.asCustomProp = asCustomProp
