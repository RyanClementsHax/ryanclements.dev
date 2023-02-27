declare module '*.md' {
  import { Serializable } from 'lib/utils/serialization'
  import { RenderablePost } from 'lib/pages/posts/[slug]/server'

  const content: Serializable<RenderablePost>
  export default content
}
