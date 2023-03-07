import { Post, PostMeta } from 'lib/content/posts/types'
import { imageService } from 'lib/content/posts/imageService'
import { parseToHast } from 'lib/content/posts/parsing'
import { formatDate } from 'lib/pages/posts/utils'
import { postService } from 'lib/content/posts/postService'
import { RenderablePost, RenderablePostMeta } from './types'

export const getRenderablePost = async (
  slug: string
): Promise<RenderablePost> => {
  const post = await postService.get(slug)
  return await convertToRenderablePost(post)
}

export const getRenderablePostMeta = async (
  slug: string
): Promise<RenderablePostMeta> => {
  const meta = await postService.getMeta(slug)
  return await convertToRenderablePostMeta(meta)
}

export const convertRawStringToRenderablePost = async (
  slug: string,
  rawString: string
): Promise<RenderablePost> => {
  const post = await postService.convertRawString(slug, rawString)
  return await convertToRenderablePost(post)
}

const convertToRenderablePost = async (post: Post): Promise<RenderablePost> => {
  return {
    ...post,
    content: await parseToHast(post.meta.slug, post.content),
    meta: await convertToRenderablePostMeta(post.meta)
  }
}

const convertToRenderablePostMeta = async ({
  bannerAlt,
  ...meta
}: PostMeta) => {
  const imgProps = await imageService.getOptimizedImageProperties(
    meta.bannerSrc
  )
  return {
    ...meta,
    publishedOn: formatDate(meta.publishedOn),
    publishedOnIso: meta.publishedOn?.toISOString(),
    updatedAt: formatDate(meta.updatedAt),
    updatedAtIso: meta.updatedAt?.toISOString(),
    bannerSrc: {
      ...imgProps,
      alt: bannerAlt
    }
  }
}