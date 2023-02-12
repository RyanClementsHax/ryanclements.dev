import { Posts, PostsProps } from 'components/pages/posts'
import { NextSeo } from 'next-seo'
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
      <NextSeo
        title="Ryan Clements's tech blog"
        description="A blog with insightful articles about software engineering"
      />
      <Posts posts={deserializedPosts} />
    </>
  )
}

export default PostsPage
