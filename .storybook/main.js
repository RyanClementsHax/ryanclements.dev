const path = require('path')

module.exports = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router'
  ],
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async baseConfig => {
    const nextConfig = require('../next.config.js')([], baseConfig)

    configureRootAbsoluteImport(baseConfig)
    configureScssModulesFromNextConfig(baseConfig, nextConfig)

    return baseConfig
  }
}

const configureRootAbsoluteImport = baseConfig =>
  baseConfig.resolve.modules.push(path.resolve(__dirname, '..'))

const configureScssModulesFromNextConfig = (baseConfig, nextConfig) =>
  baseConfig.module.rules.push({
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
        loader: 'sass-loader',
        options: {
          additionalData: nextConfig.sassOptions?.prependData
        }
      }
    ]
  })
