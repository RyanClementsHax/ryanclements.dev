import { Home } from 'components/pages/home'
import { themeMetadata } from 'components/theme'
import { IS_DEV, SITE_URL } from 'lib/constants'
import { generateRssFeed, rssMetadata } from 'lib/content/rss'
import { getRenderablePostSummaries } from 'lib/pages/posts'

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

export default async function HomePage(): Promise<JSX.Element> {
  if (!IS_DEV) {
    await generateRssFeed()
  }
  const recentPostSummaries = (await getRenderablePostSummaries()).slice(0, 10)
  return <Home recentPostSummaries={recentPostSummaries} />
}
