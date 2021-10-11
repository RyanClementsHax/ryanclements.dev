import { setInitialTheme, getInitialTheme } from './utils'

export const ThemeScript: React.FC = () => {
  const getInitialThemeAsString = String(getInitialTheme)
  const setInitialThemeAsString = String(setInitialTheme)
  const themeSetupScript = `(function() {const getInitialTheme = ${getInitialThemeAsString}; (${setInitialThemeAsString})();})()`
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: themeSetupScript }} />
}
