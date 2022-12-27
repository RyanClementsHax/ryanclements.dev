import { themeToContentMetaMap } from './types'
import {
  setInitialTheme,
  getInitialTheme,
  createUpdateContentMeta
} from './utils'

export const ThemeScript: React.FC = () => {
  const themeToContentMetaMapAsString = JSON.stringify(themeToContentMetaMap)
  const getInitialThemeAsString = String(getInitialTheme)
  const setInitialThemeAsString = String(setInitialTheme)
  const createUpdateContentMetaAsString = String(createUpdateContentMeta)
  const themeSetupScript = `(function() {const getInitialTheme = ${getInitialThemeAsString}; const updateContentMeta = (${createUpdateContentMetaAsString})(${themeToContentMetaMapAsString}); (${setInitialThemeAsString})();})()`
  // I would love to use next/script, but it doesn't work for beforeInteractive scripts https://github.com/vercel/next.js/issues/26343
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: themeSetupScript }} />
}
