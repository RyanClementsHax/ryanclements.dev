import { Root, Element } from 'hast'

export type HastTree = Root
export type HastElement = Element

export interface Post {
  meta: PostMeta
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  publishedOn?: Date
  bannerSrc: string
  bannerAlt: string
}

export interface PostSummary {
  slug: string
  title: string
  publishedOn?: Date
  description: string
}
