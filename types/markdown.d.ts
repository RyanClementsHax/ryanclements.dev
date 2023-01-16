declare module '*.md' {
  import { Serializable } from 'lib/utils/serialization'
  import { RenderablePost } from 'components/pages/posts/[slug]'

  const content: Serializable<RenderablePost>
  export default content
}
