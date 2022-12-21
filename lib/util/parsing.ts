import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import { Root } from 'hast'
import rehypeReact from 'rehype-react'
import React, { createElement, Fragment, useMemo } from 'react'
import matter, { GrayMatterFile } from 'gray-matter'

export type HastTree = Root

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkRehype)
  .use(rehypeSanitize)

export const parseToHast = async (rawString: string): Promise<HastTree> =>
  await processor.run(processor.parse(rawString))

export const parseFrontMatter = (
  rawString: string
): GrayMatterFile<string>['data'] => matter(rawString).data

export const useReactFromHast = (content: HastTree): React.ReactNode =>
  useMemo(
    () =>
      unified()
        .use(rehypeReact, { createElement, Fragment })
        .stringify(content),
    [content]
  )
