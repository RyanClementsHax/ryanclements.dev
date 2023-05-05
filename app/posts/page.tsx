import { Posts } from 'components/pages/posts'
import { getRenderablePostSummaries } from 'lib/pages/posts'

export const metadata = {
  title: "Ryan Clements's tech blog",
  description: 'A blog with insightful articles about software engineering',
  openGraph: {
    url: 'posts'
  }
}

export default async function PostsPage(): Promise<JSX.Element> {
  const posts = await getRenderablePostSummaries()
  return <Posts posts={posts} />
}
