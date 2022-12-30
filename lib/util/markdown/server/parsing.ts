import { unified, Plugin } from 'unified'
import { Node } from 'unist'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { HastTree } from '../types'
import { Schema } from 'hast-util-sanitize'
import deepmerge from '@fastify/deepmerge'
import { frontMatterTransformer } from './frontMatter'
import { imageTransformer } from './images'

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
  .use(rehypeRaw)
  .use(imageTransformer)
  .use(
    rehypeSanitize,
    deepmerge()<Schema, Schema>(defaultSchema, {
      tagNames: ['aside'],
      attributes: { '*': ['className'], img: ['data-blurdataurl'] }
    })
  )
  .use(function () {
    this.Compiler = tree => ({ tree })
  } as Plugin<[], Node, { tree: HastTree }>)
