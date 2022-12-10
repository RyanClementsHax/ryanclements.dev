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
  }
}

module.exports = config
