import { JSON_FEED_URL, RSS_FEED_URL } from 'lib/constants'

export const RssHeadLinks: React.FC = () => (
  <>
    <link rel="alternate" type="application/rss+xml" href={RSS_FEED_URL} />
    <link rel="alternate" type="application/feed+json" href={JSON_FEED_URL} />
  </>
)
