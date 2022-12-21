import { useMemo, createElement, Fragment } from 'react'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'
import { HastTree } from './types'

export const useReactFromHast = (content: HastTree): React.ReactNode =>
  useMemo(
    () =>
      unified()
        .use(rehypeReact, { createElement, Fragment })
        .stringify(content),
    [content]
  )
