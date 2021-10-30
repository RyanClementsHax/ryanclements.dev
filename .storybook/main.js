/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {import('webpack').Configuration} WebpackConfig
 */

module.exports = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    'storybook-dark-mode'
  ],
  core: {
    builder: 'webpack5'
  },
  /**
   * @param {WebpackConfig} baseConfig
   * @return {Promise<WebpackConfig>}
   */
  async webpackFinal(baseConfig) {
    const nextConfig = require('../next.config.js')([], baseConfig)

    configureRootAbsoluteImport(baseConfig)
    configureCss(baseConfig, nextConfig)

    return baseConfig
  }
}

/**
 * @param {WebpackConfig} baseConfig
 * @return {void}
 */
const configureRootAbsoluteImport = baseConfig => {
  baseConfig.resolve?.modules?.push(path.resolve(__dirname, '..'))
}

/**
 * @param {WebpackConfig} baseConfig
 * @param {NextConfig} nextConfig
 * @return {void}
 */
const configureCss = (baseConfig, nextConfig) => {
  baseConfig.module?.rules?.push({
    test: /\.(s*)css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: { auto: true }
        }
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          additionalData: nextConfig.sassOptions?.prependData
        }
      }
    ]
  })
}
