import { Plugin, unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import matter, { GrayMatterFile } from 'gray-matter'
import { HastElement, HastTree } from '../types'
import { Schema } from 'hast-util-sanitize'
import deepmerge from '@fastify/deepmerge'
import { visit } from 'unist-util-visit'
import { pointStart } from 'unist-util-position'
import { stat } from 'fs/promises'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

export const parseToHast = async (rawString: string): Promise<HastTree> =>
  await processor.run(processor.parse(rawString))

export const parseFrontMatter = (
  rawString: string
): GrayMatterFile<string>['data'] => matter(rawString).data

const rehypeOptimizeImages: Plugin<[{ rootDir: string }]> = options => {
  if (!options?.rootDir) {
    throw new Error(
      'No root dir specified for rehype image optimization plugin'
    )
  }
  const imageManager = new ImageManager(options.rootDir)
  return async (tree, file) => {
    const imageOptimizationJobs: Promise<void>[] = []
    const optimizeImage = async (
      node: HastElement,
      src: string,
      imageManager: ImageManager
    ) => {
      if (!(await imageManager.exists(src))) {
        file.fail(
          `The src "${src}" does not exist as a file within root dir "${options.rootDir}"`,
          pointStart(node)
        )
        return
      }
      node.properties = {
        ...node.properties,
        ...(await imageManager.getOptimizedImageProperties(src))
      }
    }
    visit(tree, { type: 'element', tagName: 'img' }, (node: HastElement) => {
      if (!node.properties?.src || typeof node.properties.src !== 'string') {
        file.fail('All images need a src property', pointStart(node))
        return
      }
      imageOptimizationJobs.push(
        optimizeImage(node, node.properties.src, imageManager)
      )
    })
    await Promise.all(imageOptimizationJobs)
  }
}

class ImageManager {
  constructor(private rootDir: string) {}

  public async exists(src: string) {
    return await stat(this.getFullPath(src))
      .then(() => true)
      .catch(() => false)
  }

  public async getOptimizedImageProperties(src: string) {
    const { base64, img } = await getPlaiceholder(src, {
      dir: this.rootDir,
      removeAlpha: false
    })
    return {
      ...img,
      'data-blurdataurl': base64
    }
  }

  private getFullPath(src: string) {
    return path.join(this.rootDir, src)
  }
}

const rehypeImageTransform: Plugin = function () {
  this.use(rehypeOptimizeImages, { rootDir: 'public' })
}

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeImageTransform)
  .use(
    rehypeSanitize,
    deepmerge()<Schema, Schema>(defaultSchema, {
      tagNames: ['aside'],
      attributes: { '*': ['className'] }
    })
  )
