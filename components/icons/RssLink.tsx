import { RSS_FEED_URL } from 'lib/constants'
import Link from 'next/link'
import { RssIcon } from './RssIcon'

export const RssLink: React.FC = () => (
  <Link href={RSS_FEED_URL}>
    <span className="sr-only">Link to RSS feed</span>
    <RssIcon />
  </Link>
)
