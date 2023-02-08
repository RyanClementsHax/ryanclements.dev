import { Posts, PostsProps } from 'components/pages/posts'
import { PageSeo } from 'components/PageSeo'
import {
  getSerializableRenderablePostSummaries,
  RenderablePostSummary
} from 'lib/pages/posts'
import { deserialize, Serializable } from 'lib/utils/serialization'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

export const getStaticProps: GetStaticProps<
  Serializable<PostsProps>
> = async () => {
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
  return (
    <>
      <PageSeo
        title="Ryan Clements's tech blog"
        description="A blog with insightful articles about many aspects of software engineering like deep diving into tech or commenting on the profession as a whole"
      />
      <Posts posts={deserializedPosts} />
    </>
  )
}

export default PostsPage
