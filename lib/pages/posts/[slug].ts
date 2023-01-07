import { Serializable, serialize } from 'lib/utils'
import { getAllPostSummaries } from 'lib/content/posts/server'
import { PostSummary } from 'lib/content/posts/types'
import { formatDate, sortPostSummaries } from './utils'

export interface RenderablePostSummary
  extends Omit<PostSummary, 'publishedOn'> {
  publishedOn?: string
}

export const getSerializableRenderablePostSummaries = async (): Promise<
  Serializable<RenderablePostSummary[]>
> => {
  const postSummaries = sortPostSummaries(await getAllPostSummaries())
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
