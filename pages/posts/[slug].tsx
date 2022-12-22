import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { deserialize, Serializable, serialize } from 'lib/util'
import { parseToHast } from 'lib/util/parsing/server'
import { getAllPostSlugs, getPost, Post, PostMeta } from 'lib/content/posts'
import Image from 'next/image'
import { A11yStaticImageData, postsImageSrcMap } from 'lib/content'
import { HastTree } from 'lib/util/parsing/types'
import { useReactFromHast } from 'lib/util/parsing/client'
import { Title } from 'components/pages/posts/[slug]/Title'

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

interface RenderablePost extends Omit<Post, 'content' | 'meta'> {
  content: HastTree
  meta: RenderablePostMeta
}

interface RenderablePostMeta extends Omit<PostMeta, 'bannerSrc'> {
  bannerSrc: A11yStaticImageData
}

interface PostPageProps {
  post: RenderablePost
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
      post: serializePost(renderablePost)
    }
  }
}

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  function ({ post }) {
    const { content, meta } = deserializePost(post)
    const { alt, ...bannerSrc } = meta.bannerSrc
    const children = useReactFromHast(content)

    return (
      <>
        <Image
          src={bannerSrc}
          alt={alt}
          sizes="100vw"
          placeholder="blur"
          className="relative -z-10 mx-auto aspect-[5/1] max-h-[30rem] w-full max-w-[100rem] object-cover"
        />
        <div className="mx-auto max-w-[70ch]">
          <Title>{meta.title}</Title>
          <div className="text-on-surface-base">{children}</div>
        </div>
      </>
    )
  }

export default PostPage

const convertToRenderablePost = async (
  post: Post
): Promise<RenderablePost> => ({
  ...post,
  content: await parseToHast(post.content),
  meta: {
    ...post.meta,
    bannerSrc: postsImageSrcMap[post.meta.bannerSrc]
  }
})

const serializePost = (post: RenderablePost): Serializable<RenderablePost> => ({
  ...post,
  meta: serialize(post.meta)
})

const deserializePost = (
  post: Serializable<RenderablePost>
): RenderablePost => ({
  ...post,
  meta: deserialize<RenderablePostMeta>(post.meta)
})
