import React, { createContext, useContext } from 'react'
import { usePersistedTheme } from './usePersistedTheme'
import { Theme } from './types'

export interface ThemeContextType {
  theme?: Theme
  setTheme: (value: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  get setTheme(): () => void {
    throw new Error(
      'You must use useTheme or ThemeContext within the scope of a ThemeProvider'
    )
  }
})

export const useTheme = (): ThemeContextType => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setTheme] = usePersistedTheme()

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
