import { Home } from 'components/pages/home'
import { IS_DEV } from 'lib/constants'
import { generateRssFeed } from 'lib/content/rss'
import { getSerializableRenderablePostSummaries } from 'lib/pages/posts'

export default async function Index(): Promise<JSX.Element> {
  if (!IS_DEV) {
    await generateRssFeed()
  }
  const recentPostSummaries = (
    await getSerializableRenderablePostSummaries()
  ).slice(0, 10)
  return <Home recentPostSummaries={recentPostSummaries} />
}
