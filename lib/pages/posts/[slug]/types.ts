import { A11yStaticImageData } from 'lib/content/images'
import { HastTree, Post, PostMeta } from 'lib/content/posts/types'

export interface RenderablePost extends Omit<Post, 'content' | 'meta'> {
  content: HastTree
  meta: RenderablePostMeta
}

export interface RenderablePostMeta
  extends Omit<
    PostMeta,
    'bannerSrc' | 'bannerAlt' | 'ogSrc' | 'ogAlt' | 'publishedOn' | 'updatedAt'
  > {
  publishedOn?: string
  publishedOnIso?: string
  updatedAt?: string
  updatedAtIso?: string
  bannerSrc: A11yStaticImageData
  ogSrc: A11yStaticImageData
}
