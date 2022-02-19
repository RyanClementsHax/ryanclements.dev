import { useEffect } from 'react'
import { usePrevious } from 'react-use'
import { addons } from '@storybook/addons'
import { UPDATE_GLOBALS } from '@storybook/core-events'
import { ThemeContext, updateTheme } from 'components/theme'

/**
 * @typedef {import('components/theme/types').Theme} Theme
 * @typedef {import('@storybook/react').Story} Story
 * @typedef {import('@storybook/react').ReactFramework} ReactFramework
 */

/**
 * @template T
 * @typedef {import('@storybook/csf').DecoratorFunction<T>} DecoratorFunction<T>
 */

/**
 * @param {Theme} theme
 * @return {void}
 */
const updateThemeGlobal = theme =>
  void addons.getChannel().emit(UPDATE_GLOBALS, {
    globals: { theme }
  })

/** @type {(DecoratorFunction<ReactFramework>)} */
export const ThemeDecorator = (Story, { globals, parameters }) => {
  const previousParametersTheme = usePrevious(parameters.theme)

  useEffect(() => {
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
