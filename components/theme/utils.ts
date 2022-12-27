import { ContentMeta, Theme, themeToContentMetaMap } from './types'

export const getInitialTheme = (): string => {
  const persistedThemePreference = localStorage.getItem('themePreference')
  const hasPersistedPreference = typeof persistedThemePreference === 'string'
  if (hasPersistedPreference) {
    return persistedThemePreference
  }

  const mql = matchMedia('(prefers-color-scheme: dark)')
  const hasMediaQueryPreference = typeof mql.matches === 'boolean'
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light'
  }

  return 'light'
}

export const setInitialTheme = (): void => {
  const theme = getInitialTheme()
  document.documentElement.classList.add(theme)
  updateContentMeta(theme as Theme)
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

// need to curry so this works well when stringified
export const createUpdateContentMeta =
  (themeToContentMetaMap: Record<Theme, ContentMeta>) =>
  (theme: Theme): void => {
    document
      .querySelector('meta[name="color-scheme"]')
      ?.setAttribute('content', themeToContentMetaMap[theme])
  }

const updateContentMeta = createUpdateContentMeta(themeToContentMetaMap)
