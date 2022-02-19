import { ThemeProvider } from 'components/theme'

/**
 * @typedef {import('@storybook/react').ReactFramework} ReactFramework
 */

/**
 * @template T
 * @typedef {import('@storybook/csf').DecoratorFunction<T>} DecoratorFunction<T>
 */

/** @type {(DecoratorFunction<ReactFramework>)} */
export const ThemeDecorator = Story => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
)
