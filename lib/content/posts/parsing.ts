import { unified, Plugin } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { HastTree } from './types'
import { frontMatterTransformer } from './frontMatter'
import { imageTransformer } from './imageTransformer'
import { codeTransformer } from './code'

export const parseToHast = async (
  slug: string,
  rawString: string
): Promise<HastTree> =>
  (
    await contentProcessor.process({
      stem: slug,
      value: rawString
    })
  ).result.tree

const contentProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(frontMatterTransformer)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(codeTransformer)
  .use(rehypeRaw)
  .use(imageTransformer)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
  .use(function () {
    this.Compiler = tree => ({ tree })
  } as Plugin<[], HastTree, { tree: HastTree }>)
