import { useLayoutEffect } from 'react'
import { usePrevious } from 'react-use'
import { addons } from '@storybook/addons'
import { UPDATE_GLOBALS } from '@storybook/core-events'
import { ThemeContext, updateTheme } from 'components/theme'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import 'styles/global.scss'

/**
 * @typedef {import('components/theme/types').Theme} Theme
 * @typedef {import('@storybook/react').Story} Story
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

/**
 * @param {Theme} theme
 * @return {void}
 */
const updateThemeGlobal = theme => {
  addons.getChannel().emit(UPDATE_GLOBALS, {
    globals: { theme }
  })
}

/**
 * @callback Decorator
 * @param {Story} Story
 * @param {{ globals: any, parameters: any }} context
 * @return {JSX.Element}
 */

/**
 * @type {Decorator[]}
 */
export const decorators = [
  (Story, { globals, parameters }) => {
    const previousParametersTheme = usePrevious(parameters.theme)

    useLayoutEffect(() => {
      if (
        previousParametersTheme !== parameters.theme &&
        globals.theme !== parameters.theme
      ) {
        updateThemeGlobal(parameters.theme)
      } else {
        updateTheme(globals.theme)
      }
    }, [previousParametersTheme, globals.theme, parameters.theme])

    return (
      <ThemeContext.Provider
        value={{
          theme: globals.theme,
          setTheme: updateThemeGlobal
        }}
      >
        <Story />
      </ThemeContext.Provider>
    )
  }
]

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
