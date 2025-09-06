import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import { Parameters, ReactRenderer } from '@storybook/nextjs'

import 'styles/global.scss'
import './preview.scss'
import { themeDecorators } from './decorators/theme'
import { DecoratorFunction } from 'storybook/internal/csf'

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
