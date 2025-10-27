import type { StorybookConfig } from '@storybook/nextjs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      // Ensure Storybook uses Next.js config (sassOptions, images, etc.)
      nextConfigPath: path.resolve(__dirname, '../next.config.mjs')
    }
  },
  async webpackFinal(config) {
    // Resolve SCSS imports like `@use 'styles/utils'`
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      styles: path.resolve(__dirname, '../styles')
    }

    // Keep the custom .md loader used by content stories
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
