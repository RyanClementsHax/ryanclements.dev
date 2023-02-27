import { getAllPostSummaries } from 'lib/content/posts'
import { PostSummary } from 'lib/content/posts/types'
import { formatDate, sortPostSummaries } from './utils'
import { A11yStaticImageData } from 'lib/content/images'
import { imageService } from 'lib/content/posts/imageService'

export interface RenderablePostSummary
  extends Omit<PostSummary, 'thumbnailSrc' | 'thumbnailAlt' | 'publishedOn'> {
  publishedOn?: string
  thumbnailSrc: A11yStaticImageData
}

export const getRenderablePostSummaries = async (): Promise<
  RenderablePostSummary[]
> => {
  const postSummaries = sortPostSummaries(await getAllPostSummaries())
  return await Promise.all(
    postSummaries.map(x => convertToRenderablePostSummary(x))
  )
}

const convertToRenderablePostSummary = async ({
  thumbnailSrc,
  thumbnailAlt,
  ...rest
}: PostSummary): Promise<RenderablePostSummary> => {
  const imgProps = await imageService.getOptimizedImageProperties(thumbnailSrc)
  return {
    ...rest,
    publishedOn: formatDate(rest.publishedOn),
    thumbnailSrc: {
      ...imgProps,
      alt: thumbnailAlt
    }
  }
}
