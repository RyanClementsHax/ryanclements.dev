import { loader } from 'webpack'
import path from 'path'
import { convertRawStringToSerializableRenderablePost } from 'lib/pages/posts'

const loader: loader.Loader = function (content, map) {
  const callback = this.async()

  convertRawStringToSerializableRenderablePost(
    path.parse(this.resource).name,
    content.toString()
  )
    .then(result =>
      callback?.(null, `module.exports = ${JSON.stringify(result)}`, map)
    )
    .catch(err => callback?.(err))
}

module.exports = loader