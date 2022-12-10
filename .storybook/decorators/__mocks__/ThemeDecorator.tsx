import { ReactFramework } from '@storybook/react'
import { DecoratorFunction } from '@storybook/csf'
import { ThemeProvider } from 'components/theme'

export const ThemeDecorator: DecoratorFunction<ReactFramework> = Story => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
)
