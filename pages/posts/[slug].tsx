import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { deserialize, Serializable, serialize } from 'lib/util'
import { HastTree, parseToHast, useReactFromHast } from 'lib/util/parsing'
import { getAllPostSlugs, getPost, Post, PostMeta } from 'lib/content/posts'
import Image from 'next/image'
import { A11yStaticImageData, postsImageSrcMap } from 'lib/content'

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
          className="h-[33vh] w-full object-cover"
        />
        <div className="text-on-surface-base">{children}</div>
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
