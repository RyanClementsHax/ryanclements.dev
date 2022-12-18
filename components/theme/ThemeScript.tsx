import { setInitialTheme, getInitialTheme } from './utils'

export const ThemeScript: React.FC = () => {
  const getInitialThemeAsString = String(getInitialTheme)
  const setInitialThemeAsString = String(setInitialTheme)
  const themeSetupScript = `(function() {const getInitialTheme = ${getInitialThemeAsString}; (${setInitialThemeAsString})();})()`
  // I would love to use next/script, but it doesn't work for beforeInteractive scripts https://github.com/vercel/next.js/issues/26343
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: themeSetupScript }} />
}
