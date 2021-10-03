const path = require('path')

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
  webpackFinal: async baseConfig => {
    const nextConfig = require('../next.config.js')([], baseConfig)

    configureRootAbsoluteImport(baseConfig)
    configureCss(baseConfig, nextConfig)

    return baseConfig
  }
}

const configureRootAbsoluteImport = baseConfig =>
  baseConfig.resolve.modules.push(path.resolve(__dirname, '..'))

const configureCss = (baseConfig, nextConfig) =>
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
