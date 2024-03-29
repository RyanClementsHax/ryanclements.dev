import { Posts } from 'components/pages/posts'
import { SITE_URL } from 'lib/constants'
import { getRenderablePostSummaries } from 'lib/pages/posts'

export const metadata = {
  title: "Ryan Clements's tech blog",
  description: 'A blog with insightful articles about software engineering',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    url: 'posts'
  }
}

export default async function PostsPage(): Promise<JSX.Element> {
  const posts = await getRenderablePostSummaries()
  return <Posts posts={posts} />
}
