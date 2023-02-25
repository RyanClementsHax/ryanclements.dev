import { ConsoleMessage } from 'components/ConsoleMessage'
import { ThemeProvider } from 'components/theme/ThemeContext'
import { ThemeScript } from 'components/theme/ThemeScript'
import { JSON_FEED_URL, RSS_FEED_URL } from 'lib/constants'
import { fontClass } from 'lib/fonts'

import 'styles/global.scss'

export const metadata = {
  title: 'Ryan Clements',
  icons: {
    icon: '/favicon.ico'
  },
  // TODO: abstract out
  colorScheme: 'normal',
  alternates: {
    types: {
      'application/rss+xml': RSS_FEED_URL,
      'application/feed+json': JSON_FEED_URL
    }
  }
}

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
