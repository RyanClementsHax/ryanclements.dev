import { createElement, Fragment } from 'react'
import rehypeReact from 'rehype-react'
import { ComponentsWithoutNodeOptions } from 'rehype-react/lib/complex-types'
import { unified } from 'unified'
import { HastTree } from 'lib/content/posts/types'

export const convertToReact = (
  content: HastTree,
  components: ComponentsWithoutNodeOptions['components']
): React.ReactNode =>
  unified()
    .use(rehypeReact, { createElement, Fragment, components })
    .stringify(content)
