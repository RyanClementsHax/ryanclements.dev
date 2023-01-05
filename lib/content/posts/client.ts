import { useMemo, createElement, Fragment } from 'react'
import rehypeReact from 'rehype-react'
import { ComponentsWithoutNodeOptions } from 'rehype-react/lib/complex-types'
import { unified } from 'unified'
import { HastTree } from './types'

export const useReactFromHast = (
  content: HastTree,
  components: ComponentsWithoutNodeOptions['components']
): React.ReactNode =>
  useMemo(
    () =>
      unified()
        .use(rehypeReact, { createElement, Fragment, components })
        .stringify(content),
    [content, components]
  )
