/** @type {import('@storybook/types').StorybookConfig} */
const config = {
  stories: ['../!(node_modules)/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode'
  ],
  core: {
    builder: 'webpack5'
  },
  framework: {
    name: '@storybook/nextjs',
    options: {}
  }
}
module.exports = config
