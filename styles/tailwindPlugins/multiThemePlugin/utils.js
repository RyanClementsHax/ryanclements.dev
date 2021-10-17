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

const transformValue = (value, valuePath) =>
  `var(${createCustomPropName(valuePath)}, ${value})`

const resolveThemeAsBaseConfig = (theme, prevPathSteps = []) =>
  Object.entries(theme).reduce((acc, [key, value]) => {
    const valuePath = [...prevPathSteps, key]
    return {
      ...acc,
      [key]:
        typeof value === 'object'
          ? resolveThemeAsBaseConfig(value, valuePath)
          : transformValue(value, valuePath)
    }
  }, {})

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

module.exports.resolveThemeAsBaseConfig = resolveThemeAsBaseConfig
module.exports.resolveThemeAsCustomProps = resolveThemeAsCustomProps
