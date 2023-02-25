import { convertRawStringToPost, getPost } from 'lib/content/posts/server'
import { HastTree, Post, PostMeta } from 'lib/content/posts/types'
import { imageService } from 'lib/content/posts/server/imageService'
import { parseToHast } from 'lib/content/posts/server/parsing'

import { A11yStaticImageData } from 'lib/content/images'
import { formatDate } from 'lib/pages/posts/utils'

export interface RenderablePost extends Omit<Post, 'content' | 'meta'> {
  content: HastTree
  meta: RenderablePostMeta
}

export interface RenderablePostMeta
  extends Omit<
    PostMeta,
    'bannerSrc' | 'bannerAlt' | 'publishedOn' | 'updatedAt'
  > {
  publishedOn?: string
  publishedOnIso?: string
  updatedAt?: string
  updatedAtIso?: string
  bannerSrc: A11yStaticImageData
}

export const getRenderablePost = async (
  slug: string
): Promise<RenderablePost> => {
  const post = await getPost(slug)
  return await convertToRenderablePost(post)
}

export const convertRawStringToRenderablePost = async (
  slug: string,
  rawString: string
): Promise<RenderablePost> => {
  const post = await convertRawStringToPost(slug, rawString)
  return await convertToRenderablePost(post)
}

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
}
