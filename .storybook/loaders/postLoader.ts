import path from 'path'
import { LoaderDefinitionFunction } from 'webpack'
import { convertRawStringToSerializableRenderablePost } from 'lib/pages/posts/[slug]'

module.exports = function (content, map) {
  const callback = this.async()

  convertRawStringToSerializableRenderablePost(
    path.parse(this.resource).name,
    content.toString()
  )
    .then(result =>
      callback?.(null, `module.exports = ${JSON.stringify(result)}`, map)
    )
    .catch(err => callback?.(err))
} satisfies LoaderDefinitionFunction
