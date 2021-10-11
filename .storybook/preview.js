import React, { useLayoutEffect } from 'react'
import { usePrevious } from 'react-use'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as NextImage from 'next/image'
import { addons } from '@storybook/addons'
import { UPDATE_GLOBALS } from '@storybook/core-events'
import { ThemeContext, updateTheme } from 'components/Theme'

import 'styles/global.scss'

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

const updateThemeGlobal = theme =>
  addons.getChannel().emit(UPDATE_GLOBALS, {
    globals: { theme }
  })

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
    }, [globals.theme, parameters.theme])

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
  nextRouter: {
    Provider: RouterContext.Provider
  },
  theme: 'light'
}

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />
})
