import { Posts } from 'components/pages/posts'
import { getSerializableRenderablePostSummaries } from 'lib/pages/posts'

export const metadata = {
  title: "Ryan Clements's tech blog",
  description: 'A blog with insightful articles about software engineering'
}

export default async function PostsPage(): Promise<JSX.Element> {
  const posts = await getSerializableRenderablePostSummaries()
  return <Posts posts={posts} />
}
