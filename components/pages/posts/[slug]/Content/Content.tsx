import { useReactFromHast } from 'lib/util/markdown/client'
import { HastTree } from 'lib/util/markdown/types'
import { ComponentsWithoutNodeOptions } from 'rehype-react/lib/complex-types'
import s from './Content.module.scss'
import c from 'classnames'

const components: ComponentsWithoutNodeOptions['components'] = {
  // h2: H2
}

export const Content: React.FC<{ root: HastTree }> = ({ root }) => {
  const children = useReactFromHast(root, components)
  return (
    <div
      className={c(s.content, 'prose prose-zinc max-w-none dark:prose-invert')}
    >
      {children}
    </div>
  )
}
