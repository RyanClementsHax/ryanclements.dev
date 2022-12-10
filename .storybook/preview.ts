import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { ReactFramework } from '@storybook/react'
import { DecoratorFunction, Parameters, GlobalTypes } from '@storybook/csf'

import { ThemeDecorator } from './decorators/ThemeDecorator'
import 'styles/global.scss'

export const globalTypes: GlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Color theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' }
      ]
    }
  }
}

export const decorators: DecoratorFunction<ReactFramework>[] = [ThemeDecorator]

export const parameters: Parameters = {
  layout: 'fullscreen',
  theme: 'light',
  backgrounds: {
    default: 'surface',
    values: [{ name: 'surface', value: 'rgb(var(--colors-surface-base))' }]
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
}
