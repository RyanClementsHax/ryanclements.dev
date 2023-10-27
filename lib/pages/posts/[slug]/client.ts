import rehypeReact, {
  Options as ReactRehypeOptions,
  Components
} from 'rehype-react'
import { HastTree } from 'lib/content/posts/types'
import * as prod from 'react/jsx-runtime'
import { unified } from 'unified'

// @ts-expect-error: the react types are missing.
// https://github.com/rehypejs/rehype-react/tree/93fac074e8e3447088ed2408282e9e089ea7b36c#use
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

export type Options = ReactRehypeOptions

export type ElementSubstitution<Element extends keyof Components> =
  Components[Element]

export const convertToReact = (
  content: HastTree,
  components: ReactRehypeOptions['components']
): React.ReactNode =>
  unified()
    .use(rehypeReact, { ...production, components })
    .stringify(content)
