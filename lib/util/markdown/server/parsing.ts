import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import matter, { GrayMatterFile } from 'gray-matter'
import { HastTree } from '../types'

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)

export const parseToHast = async (rawString: string): Promise<HastTree> =>
  await processor.run(processor.parse(rawString))

export const parseFrontMatter = (
  rawString: string
): GrayMatterFile<string>['data'] => matter(rawString).data
