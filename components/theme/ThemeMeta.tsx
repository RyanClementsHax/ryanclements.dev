import { themeToContentMetaMap } from './types'
import unique from 'just-unique'

// https://web.dev/color-scheme/

export const ThemeMeta = () => (
  <meta
    name="color-scheme"
    content={unique(Object.values(themeToContentMetaMap)).join(' ')}
  />
)
