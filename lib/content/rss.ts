import { Author, Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'
import { JSON_FEED_URL, RSS_FEED_URL, SITE_URL } from 'lib/constants'
import { getAllPosts } from './posts/server'

export const generateRssFeed = async (): Promise<void> => {
  const posts = await getAllPosts()

  const author: Author = {
    name: 'Ryan Clements'
  }
  const feed = new Feed({
    title: "Ryan Clements's blog",
    description: "Ryan Clements's blog",
    author,
    language: 'en-US',
    id: SITE_URL,
    link: SITE_URL,
    image: `${SITE_URL}/favicon-32x32.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: RSS_FEED_URL,
      json: JSON_FEED_URL
    }
  })

  for (const post of posts) {
    const url = `${SITE_URL}/posts/${post.meta.slug}`

    // It is possible to add the content into the feed,
    // but I chose not to since it's optional and don't
    // have an audience to tell me if they really want it
    feed.addItem({
      title: post.meta.title,
      id: url,
      link: url,
      description: post.meta.description,
      author: [author],
      contributor: [author],
      date: post.meta.publishedOn ?? new Date()
    })
  }

  await mkdir('./public/rss', { recursive: true })
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/feed.json', feed.json1(), 'utf8')
  ])
}
