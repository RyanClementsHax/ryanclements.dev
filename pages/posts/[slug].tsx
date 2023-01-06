import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { deserialize, Serializable } from 'lib/utils'
import { getAllPostSlugs } from 'lib/content/posts/server'
import { PostDetails, PostDetailsProps } from 'components/pages/posts/[slug]'
import { RenderablePost } from 'lib/content/posts/types'
import { getSerializableRenderablePost } from 'lib/content/posts/server/renderable'

interface StaticPathParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const postSlugs = await getAllPostSlugs()
  return {
    paths: postSlugs.map(x => ({ params: { slug: x } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<
  Serializable<PostDetailsProps>,
  StaticPathParams
> = async ({ params }) => {
  const { slug } = params as StaticPathParams
  return {
    props: {
      post: await getSerializableRenderablePost(slug)
    }
  }
}

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post
}) => {
  const deserializedPost = deserialize<RenderablePost>(post)
  return <PostDetails post={deserializedPost} />
}

export default PostPage
