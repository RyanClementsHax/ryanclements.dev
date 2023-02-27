'use client'

import { useTheme } from './ThemeContext'
import c from 'classnames'
import { getCurrentTheme } from './utils'

const initialTheme = typeof window === 'undefined' ? '' : getCurrentTheme()

// This is to make the hydration mismatch warning go away
// The initial theme is set by ThemeScript before rendering can take place
// This makes sure that react is happy during hydration
export const Html: React.FC<React.HTMLAttributes<HTMLHtmlElement>> = props => {
  const { theme } = useTheme()
  return (
    <html {...props} className={c(props.className, theme ?? initialTheme)} />
  )
}
