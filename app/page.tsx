import { Home } from 'components/pages/home'
import { IS_DEV } from 'lib/constants'
import { generateRssFeed } from 'lib/content/rss'
import { getRenderablePostSummaries } from 'lib/pages/posts'

export default async function HomePage(): Promise<JSX.Element> {
  if (!IS_DEV) {
    await generateRssFeed()
  }
  const recentPostSummaries = (await getRenderablePostSummaries()).slice(0, 10)
  return <Home recentPostSummaries={recentPostSummaries} />
}
