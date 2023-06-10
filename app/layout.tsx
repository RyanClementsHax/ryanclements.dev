import { ConsoleMessage } from 'components/ConsoleMessage'
import { themeMetadata, Html } from 'components/theme'
import { ThemeProvider } from 'components/theme/ThemeContext'
import { ThemeScript } from 'components/theme/ThemeScript'
import { rssMetadata } from 'lib/content/rss'
import { fontClass } from 'lib/fonts'
import deepmerge from '@fastify/deepmerge'

import 'styles/global.scss'
import { Metadata } from 'next'
import { SITE_URL } from 'lib/constants'

export const metadata = deepmerge({ all: true })<Metadata[]>(
  {
    title: 'Ryan Clements',
    description:
      'Full Time Catholic | Full Time Father | Full Stack Engineer | Massive Nerd',
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: '/favicon.ico'
    },
    twitter: {
      site: '@RyanClementsHax',
      creator: '@RyanClementsHax',
      card: 'summary_large_image'
    }
  },
  themeMetadata,
  rssMetadata
)

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <ThemeProvider>
      <Html lang="en" className={fontClass}>
        <head />
        <body>
          <ThemeScript />
          {children}
          <ConsoleMessage />
        </body>
      </Html>
    </ThemeProvider>
  )
}
