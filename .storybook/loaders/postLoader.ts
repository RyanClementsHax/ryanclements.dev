import path from 'path'
import { LoaderDefinitionFunction } from 'webpack'
import { convertRawStringToRenderablePost } from 'lib/pages/posts/[slug]/server'

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
