import { Theme, ThemeContext } from 'components/theme'
import { ReactRenderer } from '@storybook/nextjs'
import {
  withThemeByClassName,
  withThemeFromJSXProvider
} from '@storybook/addon-themes'
import { useGlobals } from 'storybook/manager-api'
import { DecoratorFunction } from 'storybook/internal/csf'

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
      children
    }: {
      theme: { name: Theme }
      children?: React.ReactNode
    }) => {
      const [{ theme: selected }, updateGlobals] = useGlobals()
      return (
        <ThemeContext.Provider
          value={{
            theme: selected,
            // TODO: consider using storybook/addon-actions instead
            setTheme: theme => updateGlobals({ theme })
          }}
        >
          {children}
        </ThemeContext.Provider>
      )
    }
  })
]
