import { Serializable, serialize } from 'lib/utils'
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
  extends Omit<PostMeta, 'bannerSrc' | 'bannerAlt' | 'publishedOn'> {
  publishedOn?: string
  bannerSrc: A11yStaticImageData
}

export const getSerializableRenderablePost = async (
  slug: string
): Promise<Serializable<RenderablePost>> => {
  const post = await getPost(slug)
  const renderablePost = await convertToRenderablePost(post)
  return serialize(renderablePost)
}

export const convertRawStringToSerializableRenderablePost = async (
  slug: string,
  rawString: string
): Promise<Serializable<RenderablePost>> => {
  const post = await convertRawStringToPost(slug, rawString)
  const renderablePost = await convertToRenderablePost(post)
  return serialize(renderablePost)
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
      bannerSrc: {
        ...imgProps,
        alt: bannerAlt
      }
    }
  }
}
