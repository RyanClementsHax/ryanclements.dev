import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  // SB9+ uses fast-glob; avoid extglob patterns here
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-styling',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
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
}

export default config
