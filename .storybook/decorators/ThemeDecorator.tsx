import { useEffect } from 'react'
import { usePrevious } from 'react-use'
import { addons } from '@storybook/addons'
import { UPDATE_GLOBALS } from '@storybook/core-events'
import { Theme, ThemeContext, updateTheme } from 'components/theme'
import { ReactRenderer } from '@storybook/react'
import { DecoratorFunction } from '@storybook/csf'

const updateThemeGlobal = (theme: Theme) =>
  void addons.getChannel().emit(UPDATE_GLOBALS, {
    globals: { theme }
  })

export const ThemeDecorator: DecoratorFunction<ReactRenderer> = (
  Story,
  { globals, parameters }
) => {
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
