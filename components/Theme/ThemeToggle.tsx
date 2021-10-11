import { useTheme } from './ThemeContext'
import { Theme } from './types'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  if (!theme) {
    return null
  }
  return (
    <label htmlFor="dark-theme-toggle">
      Dark theme
      <input
        id="dark-theme-toggle"
        type="checkbox"
        checked={theme === Theme.dark}
        onChange={({ target: { checked } }) =>
          setTheme(checked ? Theme.dark : Theme.light)
        }
      />
    </label>
  )
}
