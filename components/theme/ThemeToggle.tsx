import { Switch } from '@headlessui/react'
import { useTheme } from './ThemeContext'
import { Theme } from './types'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  if (!theme) {
    return null
  }

  const darkThemeEnabled = theme === Theme.dark

  return (
    <Switch
      checked={darkThemeEnabled}
      onChange={checked => setTheme(checked ? Theme.dark : Theme.light)}
      className={`${darkThemeEnabled ? 'bg-blue-900' : 'bg-blue-700'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-700 focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Enable dark theme</span>
      <span
        aria-hidden="true"
        className={`${darkThemeEnabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  )
}
