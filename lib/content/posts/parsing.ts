import { unified, Plugin, Processor } from 'unified'
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
    // "this" typing is poor with unified
    // this code works fine
    // https://github.com/rehypejs/rehype-react/blob/93fac074e8e3447088ed2408282e9e089ea7b36c/lib/index.js#L21
    const self = this as unknown as Processor<
      undefined,
      undefined,
      undefined,
      HastTree,
      { tree: HastTree }
    >
    self.compiler = tree => ({ tree })
  } as Plugin<[], HastTree, { tree: HastTree }>)

// Allows for custom return types
// https://github.com/unifiedjs/unified/tree/b69689bba52a918d87aa62f295ccffa8d9aa8ef8#compileresultmap
declare module 'unified' {
  interface CompileResultMap {
    // Register a new result (value is used, key should match it).
    parsedHast: { tree: HastTree }
  }
}
