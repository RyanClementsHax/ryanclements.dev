import { Posts } from 'components/pages/posts'
import {
  getSerializableRenderablePostSummaries,
  RenderablePostSummary
} from 'lib/pages/posts/[slug]'
import { deserialize } from 'lib/utils'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: await getSerializableRenderablePostSummaries()
    }
  }
}

const PostsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts
}) => {
  const deserializedPosts = deserialize<RenderablePostSummary[]>(posts)
  return <Posts posts={deserializedPosts} />
}

export default PostsPage