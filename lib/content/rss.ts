import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'
import { JSON_FEED_URL, RSS_FEED_URL, SITE_URL } from 'lib/constants'
import { getAllPosts } from './posts/server'

export const generateRssFeed = async (): Promise<void> => {
  const posts = await getAllPosts()
  const author = {
    name: 'Ryan Clements',
    email: 'ryanclementshax@gmail.com'
  }

  const feed = new Feed({
    title: author.name,
    description: "Ryan Clements's personal website",
    author,
    id: SITE_URL,
    link: SITE_URL,
    image: `${SITE_URL}/favicon.ico`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: RSS_FEED_URL,
      json: JSON_FEED_URL
    }
  })

  for (const post of posts) {
    const url = `${SITE_URL}/posts/${post.meta.slug}`
    const html = 'TODO'

    feed.addItem({
      title: post.meta.title,
      id: url,
      link: url,
      description: post.meta.description,
      content: html,
      author: [author],
      contributor: [author],
      date:
        post.meta.publishedOn ??
        (() => {
          throw new Error(
            `Tried to include ${post.meta.title} in the rss feed, but it isn't published yet`
          )
        })()
    })
  }

  await mkdir('./public/rss', { recursive: true })
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/feed.json', feed.json1(), 'utf8')
  ])
}
