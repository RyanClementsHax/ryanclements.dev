import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { DecoratorFunction, Parameters } from '@storybook/csf'
import { ReactRenderer } from '@storybook/react'

import 'styles/global.scss'
import './preview.scss'
import { themeDecorators } from './decorators/theme'

export const decorators = [
  ...themeDecorators
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
