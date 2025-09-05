import { Posts } from 'components/pages/posts'
import { SITE_URL } from 'lib/constants'
import { getRenderablePostSummaries } from 'lib/pages/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Ryan Clements's tech blog",
  description: 'A blog with insightful articles about software engineering',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    url: 'posts'
  }
}

export default async function PostsPage(): Promise<React.JSX.Element> {
  const posts = await getRenderablePostSummaries()
  return <Posts posts={posts} />
}
