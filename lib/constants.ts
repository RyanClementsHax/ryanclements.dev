export const INITIAL_YEAR = 2022

export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'

const protocol = IS_DEV ? 'http://' : 'https://'

export const SITE_URL: string =
  protocol + (process.env.NEXT_PUBLIC_URL ?? 'localhost:3000')

export const RSS_FEED_URL = `${SITE_URL}/rss/feed.xml`
export const JSON_FEED_URL = `${SITE_URL}/rss/feed.json`

export const ASSET_DIR = 'public'
export const POSTS_DIR = 'posts'
