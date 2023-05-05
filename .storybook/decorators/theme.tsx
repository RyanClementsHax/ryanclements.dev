import { Theme, ThemeContext } from 'components/theme'
import { ReactRenderer } from '@storybook/react'
import { DecoratorFunction } from '@storybook/csf'
import {
  withThemeByClassName,
  withThemeFromJSXProvider
} from '@storybook/addon-styling'
import { action } from '@storybook/addon-actions'

const defaultTheme = Theme.light

export const themeDecorators: DecoratorFunction<ReactRenderer>[] = [
  withThemeByClassName<ReactRenderer>({
    themes: Theme,
    defaultTheme
  }),
  // Using the provider decorator should be fine as the only undesirable side effect it has
  // is reinitializing the global theme
  // https://github.com/storybookjs/addon-styling/blob/759f55b1f86f840eb8754769aa9aa0322776b2b7/src/decorators/provider.strategy.tsx#L34
  withThemeFromJSXProvider<ReactRenderer>({
    themes: Object.fromEntries(
      Object.entries(Theme).map(([key, value]) => [key, { name: value }])
    ),
    defaultTheme,
    Provider: ({
      theme: { name: theme },
      children
    }: {
      theme: { name: Theme }
      children?: React.ReactNode
    }) => {
      return (
        <ThemeContext.Provider
          value={{ theme, setTheme: (...args) => action('setTheme')(...args) }}
        >
          {children}
        </ThemeContext.Provider>
      )
    }
  })
]
