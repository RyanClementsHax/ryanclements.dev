import { Root, Element } from 'hast'
import { A11yStaticImageData } from '../images'

export type HastTree = Root
export type HastElement = Element

export interface Post {
  meta: PostMeta
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  publishedOn?: Date
  bannerSrc: string
  bannerAlt: string
}

export interface RenderablePost extends Omit<Post, 'content' | 'meta'> {
  content: HastTree
  meta: RenderablePostMeta
}

export interface RenderablePostMeta
  extends Omit<PostMeta, 'bannerSrc' | 'bannerAlt' | 'publishedOn'> {
  publishedOn?: string
  bannerSrc: A11yStaticImageData
}
