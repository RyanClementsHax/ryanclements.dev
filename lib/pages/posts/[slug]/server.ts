import { cachedPostService } from 'lib/pages/server'
import { RenderablePost, RenderablePostMeta } from './types'
import { cache } from 'react'
import { convertToRenderablePost, convertToRenderablePostMeta } from './utils'

export const getRenderablePost = cache(
  async (slug: string): Promise<RenderablePost> => {
    const post = await cachedPostService.get(slug)
    return await convertToRenderablePost(post)
  }
)

export const getRenderablePostMeta = cache(
  async (slug: string): Promise<RenderablePostMeta> => {
    const meta = await cachedPostService.getMeta(slug)
    return await convertToRenderablePostMeta(meta)
  }
)
