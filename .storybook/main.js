/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const { nextImageLoaderRegex } = require('next/dist/build/webpack-config')

/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {import('webpack').Configuration} WebpackConfig
 */

module.exports = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    'storybook-addon-next-router',
    'storybook-dark-mode',
    'storybook-addon-designs'
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
    configureStaticImageImport(baseConfig)

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

/**
 * @param {WebpackConfig} baseConfig
 * @return {void}
 */
const configureStaticImageImport = baseConfig => {
  if (!baseConfig.module) baseConfig.module = {}
  if (!baseConfig.module.rules) baseConfig.module.rules = []

  const rules = baseConfig.module.rules
  rules.forEach((rule, i) => {
    if (
      typeof rule !== 'string' &&
      rule.test instanceof RegExp &&
      rule.test.test('test.jpg')
    ) {
      rules[i] = {
        test: nextImageLoaderRegex,
        use: [
          {
            loader: path.resolve(__dirname, 'next-image-loader-mock')
          }
        ]
      }
    }
  })
}
