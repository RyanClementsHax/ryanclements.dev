/** @type {import('@storybook/core-common').StorybookConfig} */
const config = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
    'storybook-addon-next'
  ],
  core: {
    builder: 'webpack5'
  },
  async webpackFinal(config) {
    config.module?.rules.push({
      test: /\.md$/,
      loader: require.resolve('./loaders/dist/postLoader'),
      // without this, webpack treats .md files like strings
      // but this loader converts it to json
      type: 'javascript/auto'
    })
    return config
  }
}

module.exports = config
