import { format } from 'date-fns'
import { Serializable, serialize } from 'lib/utils'
import { convertRawStringToPost, getAllPostSummaries, getPost } from '.'
import {
  Post,
  PostSummary,
  RenderablePost,
  RenderablePostSummary
} from '../types'
import { imageService } from './imageService'
import { parseToHast } from './parsing'

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

export const getSerializableRenderablePostSummaries = async (): Promise<
  Serializable<RenderablePostSummary[]>
> => {
  const postSummaries = await getAllPostSummaries()
  const renderablePostSummaries = postSummaries.map(x =>
    convertToRenderablePostSummary(x)
  )
  return serialize(renderablePostSummaries)
}

const convertToRenderablePostSummary = (
  postSummary: PostSummary
): RenderablePostSummary => ({
  ...postSummary,
  publishedOn: formatDate(postSummary.publishedOn)
})

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

const formatDate = (date?: Date) =>
  date ? format(date, 'MMM do, y') : undefined
