import { ThemeDecorator } from './decorators/ThemeDecorator'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import 'styles/global.scss'

/**
 * @typedef {import('components/theme/types').Theme} Theme
 * @typedef {import('@storybook/react').Story} Story
 * @typedef {import('@storybook/react').ReactFramework} ReactFramework
 */

/**
 * @template T
 * @typedef {import('@storybook/csf').DecoratorFunction<T>} DecoratorFunction<T>
 */

export const globalTypes = {
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

/** @type {(DecoratorFunction<ReactFramework>)[]} */
export const decorators = [ThemeDecorator]

export const parameters = {
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
