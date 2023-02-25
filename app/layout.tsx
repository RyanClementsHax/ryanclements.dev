import { ConsoleMessage } from 'components/ConsoleMessage'
import { ThemeProvider } from 'components/theme/ThemeContext'
import { ThemeScript } from 'components/theme/ThemeScript'
import { fontClass } from 'lib/fonts'

import 'styles/global.scss'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    // suppressHydrationWarning here is to suppress the warning caused by
    // ThemeScript adding a class name to the html tag during initial render
    <html lang="en" className={fontClass} suppressHydrationWarning>
      <head />
      <body>
        <ThemeScript />
        <ThemeProvider>{children}</ThemeProvider>
        <ConsoleMessage />
      </body>
    </html>
  )
}
