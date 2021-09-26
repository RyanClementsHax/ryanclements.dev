// @ts-check

/**
 * Gets the build context as defined by process.env.CONTEXT
 * @return {string} The build context as defined by process.env.CONTEXT
 * @throws {Error} process.env.CONTEXT must be defined
 */
const getBuildContext = () => {
  if (process.env.CONTEXT) {
    return process.env.CONTEXT
  } else {
    throw Error('process.env.CONTEXT must be defined')
  }
}

/**
 * Gets the base url of the application based on the build context
 * @return {string} The base url
 * @throws {Error} The env var must be set
 */
const getBaseUrl = () => {
  const context = getBuildContext()

  /** @type {{ [index:string]: string }} */
  const contextToBaseUrlEnvVarMap = {
    production: 'URL',
    'deploy-preview': 'DEPLOY_PRIME_URL',
    dev: 'AUTH0_BASE_URL'
  }
  const baseUrlEnvVar = contextToBaseUrlEnvVarMap[context]
  const baseUrl = process.env[baseUrlEnvVar]

  if (!baseUrl) {
    throw Error(
      `The ${baseUrlEnvVar} must be set to be the base url when CONTEXT='${process.env.CONTEXT}'`
    )
  }

  return baseUrl
}

/**
 * Gets a specific env var based on the build context
 *
 * e.g. If the variable to get is 'MY_SECRET' then the var will be fetched from the environment variables with a prefix based on the build context
 *
 * process.env.CONTEXT=dev              -> 'MY_SECRET' will be the var fetched
 * process.env.CONTEXT='deploy-preview' -> 'STG_MY_SECRET' will be the var fetched
 * process.env.CONTEXT=production       -> 'PROD_MY_SECRET' will be the var fetched
 *
 * @param {string} normalizedVar The normalized env var to get (e.g. 'MY_SECRET')
 * @return {{ [index:string]: string }} An object with the normalized env var set to the value fetched using the build context (e.g. { 'MY_SECRET': 'secret val' })
 * @throws {Error} The env var fetched must be set
 */
const getVarBasedOnContext = normalizedVar => {
  const context = getBuildContext()
  /** @type {{ [index:string]: string }} */
  const contextToEnvVarPrefixMap = {
    production: 'PROD_',
    'deploy-preview': 'STG_',
    dev: ''
  }
  const prefix = contextToEnvVarPrefixMap[context]
  const envVarName = `${prefix}${normalizedVar}`
  const value = process.env[envVarName]
  if (!value) {
    throw new Error(
      `${envVarName} must be defined to load var ${normalizedVar} when CONTEXT=${context}`
    )
  }
  return {
    [normalizedVar]: value
  }
}

/**
 * Gets the auth0 config based on the build context
 * @return {{ [index:string]: string }} The base url
 */
module.exports.getAuth0Config = () => ({
  ...getVarBasedOnContext('AUTH0_SECRET'),
  ...getVarBasedOnContext('AUTH0_ISSUER_BASE_URL'),
  ...getVarBasedOnContext('AUTH0_CLIENT_ID'),
  ...getVarBasedOnContext('AUTH0_CLIENT_SECRET'),
  ...getVarBasedOnContext('AUTH0_AUDIENCE'),
  AUTH0_BASE_URL: getBaseUrl()
})
