import { imageService } from 'lib/content/posts/imageService'
import { parseToHast } from 'lib/content/posts/parsing'
import { Post, PostMeta } from 'lib/content/posts/types'
import { formatDate } from '../utils'
import { RenderablePost, RenderablePostMeta } from './types'

export const convertToRenderablePost = async (
  post: Post
): Promise<RenderablePost> => {
  return {
    ...post,
    content: await parseToHast(post.meta.slug, post.content),
    meta: await convertToRenderablePostMeta(post.meta)
  }
}

export const convertToRenderablePostMeta = async ({
  bannerAlt,
  ogAlt,
  ...meta
}: PostMeta): Promise<RenderablePostMeta> => {
  const bannerImageProps = await imageService.getOptimizedImageProperties(
    meta.bannerSrc
  )
  const ogImageProps = await imageService.getOptimizedImageProperties(
    meta.ogSrc
  )
  return {
    ...meta,
    publishedOn: formatDate(meta.publishedOn),
    publishedOnIso: meta.publishedOn?.toISOString(),
    updatedAt: formatDate(meta.updatedAt),
    updatedAtIso: meta.updatedAt?.toISOString(),
    bannerSrc: {
      ...bannerImageProps,
      alt: bannerAlt
    },
    ogSrc: {
      ...ogImageProps,
      alt: ogAlt
    }
  }
}
