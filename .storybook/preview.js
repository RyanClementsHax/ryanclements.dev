/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useLayoutEffect } from 'react'
import { usePrevious } from 'react-use'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as NextImage from 'next/image'
import { addons } from '@storybook/addons'
import { UPDATE_GLOBALS } from '@storybook/core-events'
import { ThemeContext, updateTheme } from 'components/theme'

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
  nextRouter: {
    Provider: RouterContext.Provider
  },
  theme: 'light'
}

const OriginalNextImage = NextImage.default

// eslint-disable-next-line no-import-assign
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (/** @type {import('next/image').ImageProps} */ props) => {
    if (typeof props.src === 'string') {
      return (
        <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
      )
    } else {
      return <OriginalNextImage {...props} unoptimized />
    }
  }
})
