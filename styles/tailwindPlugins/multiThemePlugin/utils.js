/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('lodash')

const toKebabCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

const createCustomPropName = valuePath =>
  `--${valuePath
    .filter(step => step.toLowerCase() !== 'default')
    .map(toKebabCase)
    .join('-')}`

const asCustomProp = valuePath => `var(${createCustomPropName(valuePath)})`

const toBaseConfig = (theme, prevPathSteps = []) =>
  Object.entries(theme).reduce((acc, [key, value]) => {
    const valuePath = [...prevPathSteps, key]
    return {
      ...acc,
      [key]:
        typeof value === 'object'
          ? toBaseConfig(value, valuePath)
          : asCustomProp(valuePath)
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
        : { [createCustomPropName(valuePath)]: value })
    }
  }, {})

module.exports.resolveThemesAsBaseConfig = resolveThemesAsBaseConfig
module.exports.resolveThemeAsCustomProps = resolveThemeAsCustomProps
