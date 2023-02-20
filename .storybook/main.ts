import type { StorybookConfig } from '@storybook/nextjs'

module.exports = {
  stories: ['../!(node_modules)/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  async webpackFinal(config) {
    config.module?.rules?.push({
      test: /\.md$/,
      loader: require.resolve('./loaders/dist/postLoader'),
      // without this, webpack treats .md files like strings
      // but this loader converts it to json
      type: 'javascript/auto'
    })
    return config
  }
} satisfies StorybookConfig
