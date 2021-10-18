/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('lodash')
const Color = require('color')

const toKebabCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

const asRgb = value => {
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

const toBaseConfig = (theme, prevPathSteps = []) =>
  Object.entries(theme).reduce((acc, [key, value]) => {
    const valuePath = [...prevPathSteps, key]
    return {
      ...acc,
      [key]:
        typeof value === 'object'
          ? toBaseConfig(value, valuePath)
          : asCustomProp(value, valuePath)
    }
  }, {})

const resolveThemesAsBaseConfig = themes => {
  const mergedTheme = merge({}, ...Object.values(themes))
  return toBaseConfig(mergedTheme)
}

const resolveThemeAsCustomProps = (theme, prevPathSteps = []) =>
  Object.entries(theme).reduce((acc, [key, value]) => {
    const valuePath = [...prevPathSteps, key]
    return {
      ...acc,
      ...(typeof value === 'object'
        ? resolveThemeAsCustomProps(value, valuePath)
        : { [createCustomPropName(valuePath)]: createCustomPropValue(value) })
    }
  }, {})

module.exports.resolveThemesAsBaseConfig = resolveThemesAsBaseConfig
module.exports.resolveThemeAsCustomProps = resolveThemeAsCustomProps
