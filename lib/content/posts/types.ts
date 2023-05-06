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
  updatedAt?: Date
  bannerSrc: string
  bannerAlt: string
  ogSrc: string
  ogAlt: string
}

export interface PostSummary {
  slug: string
  title: string
  publishedOn?: Date
  description: string
  thumbnailSrc: string
  thumbnailAlt: string
}
