declare module '*.md' {
  import { Serializable } from 'lib/util'
  import { RenderablePost } from 'components/pages/posts/[slug]'

  const content: Serializable<RenderablePost>
  export default content
}
