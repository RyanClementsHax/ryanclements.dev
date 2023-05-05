import { postService } from 'lib/content/posts/postService'
import { RenderablePost } from 'lib/pages/posts/[slug]/types'
import { convertToRenderablePost } from 'lib/pages/posts/[slug]/utils'
import path from 'path'
import { LoaderDefinitionFunction } from 'webpack'

const convertRawStringToRenderablePost = async (
  slug: string,
  rawString: string
): Promise<RenderablePost> => {
  const post = await postService.convertRawString(slug, rawString)
  return await convertToRenderablePost(post)
}

module.exports = function (content, map) {
  const callback = this.async()

  convertRawStringToRenderablePost(
    path.parse(this.resource).name,
    content.toString()
  )
    .then(result =>
      callback?.(null, `module.exports = ${JSON.stringify(result)}`, map)
    )
    .catch(err => callback?.(err))
} satisfies LoaderDefinitionFunction
