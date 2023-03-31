import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { DecoratorFunction, Parameters } from '@storybook/csf'
import { withThemeByClassName } from '@storybook/addon-styling'

import 'styles/global.scss'
import './preview.scss'
import { ReactRenderer } from '@storybook/react'

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark'
    },
    defaultTheme: 'light'
  })
] as DecoratorFunction<ReactRenderer>[]

export const parameters: Parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'surface',
    values: [{ name: 'surface', value: 'rgb(var(--colors-surface-base))' }]
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
}
