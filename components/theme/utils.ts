import { Theme, themeToContentMetaMap } from './types'

const _Theme = Theme
const _themeToContentMetaMap = themeToContentMetaMap

export const initTheme = (
  Theme: typeof _Theme,
  themeToContentMetaMap: typeof _themeToContentMetaMap
): void => {
  const getInitialTheme = (): Theme => {
    const persistedThemePreference = localStorage.getItem('themePreference')
    const hasPersistedPreference = typeof persistedThemePreference === 'string'
    if (hasPersistedPreference) {
      return persistedThemePreference as Theme
    }

    const mql = matchMedia('(prefers-color-scheme: dark)')
    const hasMediaQueryPreference = typeof mql.matches === 'boolean'
    if (hasMediaQueryPreference) {
      return mql.matches ? Theme.dark : Theme.light
    }

    return Theme.light
  }
  const theme = getInitialTheme()
  document.documentElement.classList.add(theme)

  document
    .querySelector('meta[name="color-scheme"]')
    ?.setAttribute('content', themeToContentMetaMap[theme])
}

export const getCurrentTheme = (): Theme =>
  (document.documentElement.className
    .split(' ')
    .filter(x => x in Theme)[0] as Theme) || Theme.light

export const updateTheme = (newTheme: Theme): void => {
  for (const theme in Theme) {
    document.documentElement.classList.remove(theme)
  }
  document.documentElement.classList.add(newTheme)
}

export const updateAndPersistTheme = (newTheme: Theme): void => {
  updateTheme(newTheme)
  updateContentMeta(newTheme)
  localStorage.setItem('themePreference', newTheme)
}

const updateContentMeta = (theme: Theme): void => {
  document
    .querySelector('meta[name="color-scheme"]')
    ?.setAttribute('content', themeToContentMetaMap[theme])
}
