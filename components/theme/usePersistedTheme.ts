import { useCallback, useEffect, useState } from 'react'
import { Theme } from './types'
import { getCurrentTheme, updateAndPersistTheme } from './utils'

export const usePersistedTheme = (): [
  Theme | undefined,
  (newTheme: Theme) => void
] => {
  const [theme, rawSetTheme] = useState<Theme>()

  useEffect(() => {
    const initialTheme = getCurrentTheme()
    rawSetTheme(initialTheme)
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    updateAndPersistTheme(newTheme)
    rawSetTheme(newTheme)
  }, [])

  return [theme, setTheme]
}
