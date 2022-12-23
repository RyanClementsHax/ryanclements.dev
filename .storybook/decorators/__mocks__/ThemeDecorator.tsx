import { ReactRenderer } from '@storybook/react'
import { DecoratorFunction } from '@storybook/csf'
import { ThemeProvider } from 'components/theme'

export const ThemeDecorator: DecoratorFunction<ReactRenderer> = Story => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
)
