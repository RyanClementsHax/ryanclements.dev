import { ConsoleMessage } from 'components/ConsoleMessage'
import { themeMetadata } from 'components/theme'
import { ThemeProvider } from 'components/theme/ThemeContext'
import { ThemeScript } from 'components/theme/ThemeScript'
import { SITE_URL } from 'lib/constants'
import { rssMetadata } from 'lib/content/rss'
import { fontClass } from 'lib/fonts'

import 'styles/global.scss'

export const metadata = {
  title: 'Ryan Clements',
  description:
    'Full Time Catholic | Full Time Father | Full Stack Engineer | Massive Nerd',
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    url: `${SITE_URL}/`
  },
  twitter: {
    site: '@RyanClementsHax',
    creator: '@RyanClementsHax',
    card: 'summary_large_image'
  },
  ...themeMetadata,
  ...rssMetadata
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
