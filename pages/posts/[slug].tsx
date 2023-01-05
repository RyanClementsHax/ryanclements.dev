import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { deserialize, Serializable, serialize } from 'lib/util'
import { getAllPostSlugs, getPost } from 'lib/content/posts/server'
import { imageService } from 'lib/content/posts/server/imageService'
import { format } from 'date-fns'
import { Post, PostPageProps, RenderablePost } from 'dist/lib/content/posts'
import { PostDetails } from 'components/pages/posts/[slug]'
import { parseToHast } from 'lib/content/posts/server/parsing'

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
  Serializable<PostPageProps>,
  StaticPathParams
> = async ({ params }) => {
  const { slug } = params as StaticPathParams
  const post = await getPost(slug)
  const renderablePost = await convertToRenderablePost(post)
  return {
    props: {
      post: serialize(renderablePost)
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

const convertToRenderablePost = async (post: Post): Promise<RenderablePost> => {
  const { bannerAlt, ...meta } = post.meta
  const imgProps = await imageService.getOptimizedImageProperties(
    post.meta.bannerSrc
  )
  return {
    ...post,
    content: await parseToHast(post.meta.slug, post.content),
    meta: {
      ...meta,
      publishedOn: meta.publishedOn
        ? format(meta.publishedOn, 'MMM do, y')
        : undefined,
      bannerSrc: {
        ...imgProps,
        alt: bannerAlt
      }
    }
  }
}
