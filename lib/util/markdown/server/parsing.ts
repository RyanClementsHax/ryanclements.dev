import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import matter, { GrayMatterFile } from 'gray-matter'
import { HastTree } from '../types'
import { Schema } from 'hast-util-sanitize'
import deepmerge from '@fastify/deepmerge'

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(
    rehypeSanitize,
    deepmerge()<Schema, Schema>(defaultSchema, {
      tagNames: ['aside'],
      attributes: { '*': ['className'] }
    })
  )

export const parseToHast = async (rawString: string): Promise<HastTree> =>
  await processor.run(processor.parse(rawString))

export const parseFrontMatter = (
  rawString: string
): GrayMatterFile<string>['data'] => matter(rawString).data
