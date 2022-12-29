import { CompilerFunction, Plugin, Preset, unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { HastElement, HastTree } from '../types'
import { Schema } from 'hast-util-sanitize'
import deepmerge from '@fastify/deepmerge'
import { visit } from 'unist-util-visit'
import { pointStart } from 'unist-util-position'
import path from 'path'
import { YAML } from 'mdast'
import { parse } from 'yaml'
import { VFile } from 'vfile'
import { Node } from 'unist'
import { ImageManager, imageManager } from 'lib/util/images'

export const parseToHast = async (
  slug: string,
  rawString: string
): Promise<HastTree> => {
  const vfile = new VFile({
    stem: slug,
    value: rawString
  })
  return await processor.run(processor.parse(vfile), vfile)
}

export const parseFrontMatter = async (
  slug: string,
  rawString: string
): Promise<Record<string, unknown>> => {
  const vfile = new VFile({
    stem: slug,
    value: rawString
  })
  const { result } = await unified()
    .use(remarkParse)
    .use(frontMatterProcessor)
    .use(frontMatterCompiler)
    .process(vfile)
  return result as Record<string, unknown>
}

const frontMatterCompiler: Plugin<
  [],
  Node,
  Record<string, unknown>
> = function () {
  const compile: CompilerFunction<Node, Record<string, unknown>> = function (
    _,
    file
  ) {
    return file.data.frontMatter as Record<string, unknown>
  }

  Object.assign(this, { Compiler: compile })
}

const rehypeOptimizeImages: Plugin<[{ rootDir: string }]> =
  ({ rootDir }) =>
  async (tree, file) => {
    const imageOptimizationJobs: Promise<void>[] = []
    const optimizeImage = async (
      node: HastElement,
      src: string,
      imageManager: ImageManager
    ) => {
      if (!(await imageManager.exists(src))) {
        file.fail(
          `The src "${src}" does not exist as a file within root dir "${rootDir}"`,
          pointStart(node)
        )
        return
      }
      const { blurDataURL, ...props } =
        await imageManager.getOptimizedImageProperties(src)
      node.properties = {
        ...node.properties,
        ...props,
        'data-blurdataurl': blurDataURL
      }
    }
    visit(tree, { type: 'element', tagName: 'img' }, (node: HastElement) => {
      if (!node.properties?.src || typeof node.properties.src !== 'string') {
        file.fail(
          'All images need a src property of type string',
          pointStart(node)
        )
        return
      }
      imageOptimizationJobs.push(
        optimizeImage(node, node.properties.src, imageManager)
      )
    })
    await Promise.all(imageOptimizationJobs)
  }

const remarkParseFrontmatter: Plugin = () => async (tree, file) => {
  let yamlNode: YAML | undefined

  visit(tree, 'yaml', (node: YAML) => {
    if (yamlNode) {
      file.fail(
        'Cannot have multiple yaml nodes in one markdown file',
        pointStart(node)
      )
      return
    } else {
      yamlNode = node
    }
  })

  file.data.frontMatter = yamlNode ? parse(yamlNode.value) : {}
}

const frontMatterAddBannerSrc: Plugin<
  [{ postsDir: string; bannerFileName: string }]
> =
  ({ postsDir, bannerFileName }) =>
  async (_, file) => {
    if (!file.stem) {
      file.fail(
        'In order for a banner src to be automatically added, the file slug must be included with the content'
      )
      return
    }
    if (!file.data.frontMatter) {
      file.fail(
        'Must include the banner src plugin after the front matter parsing plugin'
      )
      return
    }
    const frontMatter = file.data.frontMatter as Record<string, unknown>
    frontMatter.bannerSrc = path.join(postsDir, file.stem, bannerFileName)
  }

const frontMatterOptimizeBannerSrc: Plugin<[{ rootDir: string }]> =
  ({ rootDir }) =>
  async (_, file) => {
    const frontMatter = file.data.frontMatter as
      | Record<string, unknown>
      | undefined
    if (!frontMatter?.bannerSrc) {
      file.fail(
        'Must include the banner src optimization plugin after the banner src plugin'
      )
      return
    }
    const bannerSrc = frontMatter.bannerSrc
    if (typeof bannerSrc !== 'string') {
      file.fail('bannerSrc must be a string in order for it to be optimized')
      return
    }
    if (!(await imageManager.exists(bannerSrc))) {
      file.fail(
        `The bannerSrc "${bannerSrc}" does not exist as a file within root dir "${rootDir}"`
      )
    }
    frontMatter.bannerSrc = await imageManager.getOptimizedImageProperties(
      bannerSrc
    )
  }

const rehypeRewriteImageSrcs: Plugin<[{ postsDir: string }]> =
  ({ postsDir }) =>
  async (tree, file) => {
    visit(tree, { type: 'element', tagName: 'img' }, (node: HastElement) => {
      if (!file.stem) {
        file.fail(
          'In order for image paths to be rewritten properly, the file slug must be included with the content'
        )
        return
      }
      if (!node.properties?.src || typeof node.properties.src !== 'string') {
        file.fail(
          'All images need a src property of type string',
          pointStart(node)
        )
        return
      }
      node.properties.src = path.join(postsDir, file.stem, node.properties.src)
    })
  }

const frontMatterProcessor: Preset = {
  plugins: [
    [remarkFrontmatter],
    [remarkParseFrontmatter],
    [
      frontMatterAddBannerSrc,
      {
        postsDir: 'posts',
        bannerFileName: 'banner.jpg'
      }
    ]
  ]
}

const processor = unified()
  .use(remarkParse)
  .use(frontMatterProcessor)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(frontMatterOptimizeBannerSrc, { rootDir: 'public' })
  .use(rehypeRewriteImageSrcs, { postsDir: 'posts' })
  .use(rehypeOptimizeImages, { rootDir: 'public' })
  .use(
    rehypeSanitize,
    deepmerge()<Schema, Schema>(defaultSchema, {
      tagNames: ['aside'],
      attributes: { '*': ['className'], img: ['data-blurdataurl'] }
    })
  )
