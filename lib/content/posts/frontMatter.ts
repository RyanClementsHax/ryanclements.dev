import remarkParse from 'remark-parse'
import { unified, Plugin, Processor } from 'unified'
import { Node } from 'unist'
import { stringify } from 'gray-matter'
import { PresetBuilder } from './presetBuilder'
import remarkFrontmatter from 'remark-frontmatter'
import { imageService } from './imageService'
import { matter } from 'vfile-matter'
import { VFile } from 'vfile'

export const parseFrontMatter = async (
  slug: string,
  rawString: string
): Promise<Record<string, unknown>> =>
  (
    await frontMatterProcessor.process({
      stem: slug,
      value: rawString
    })
  ).result

export const writeFrontMatter = async (
  frontMatter: object,
  rawString: string
): Promise<string> => {
  const file = new VFile(rawString)
  matter(file, { strip: true })
  return stringify(String(file.value), frontMatter)
}

const remarkParseFrontmatter: Plugin = () => async (_, file) => {
  matter(file)
}

const frontMatterAddBannerSrc: Plugin = () => async (_, file) => {
  if (!file.stem) {
    file.fail(
      'In order for a banner src to be automatically added, the file slug must be included with the content'
    )
    return
  }
  if (!file.data.matter) {
    file.fail(
      'Must include the banner src plugin after the front matter parsing plugin'
    )
    return
  }
  const frontMatter = file.data.matter as Record<string, unknown>
  frontMatter.bannerSrc = imageService.getPostBannerSrc(file.stem)
}

const frontMatterAddOgImageData: Plugin = () => async (_, file) => {
  if (!file.stem) {
    file.fail(
      'In order for a og src to be automatically added, the file slug must be included with the content'
    )
    return
  }
  if (!file.data.matter) {
    file.fail(
      'Must include the og src plugin after the front matter parsing plugin'
    )
    return
  }
  const frontMatter = file.data.matter as Record<string, unknown>
  frontMatter.ogSrc = imageService.getPostOgSrc(file.stem)
  frontMatter.ogAlt = frontMatter.ogAlt ?? frontMatter.bannerAlt
}

export const frontMatterTransformer = new PresetBuilder()
  .use(remarkFrontmatter)
  .use(remarkParseFrontmatter)
  .use(frontMatterAddBannerSrc)
  .use(frontMatterAddOgImageData)
  .build()

const frontMatterProcessor = unified()
  .use(remarkParse)
  .use(frontMatterTransformer)
  .use(function () {
    // "this" typing is poor with unified
    // this code works fine
    // https://github.com/rehypejs/rehype-react/blob/93fac074e8e3447088ed2408282e9e089ea7b36c/lib/index.js#L21
    const self = this as unknown as Processor<
      undefined,
      undefined,
      undefined,
      Node,
      Record<string, unknown>
    >
    self.compiler = (_, file) => file.data.matter as Record<string, unknown>
  } as Plugin<[], Node, Record<string, unknown>>)

// Allows for custom return types
// https://github.com/unifiedjs/unified/tree/b69689bba52a918d87aa62f295ccffa8d9aa8ef8#compileresultmap
declare module 'unified' {
  interface CompileResultMap {
    // Register a new result (value is used, key should match it).
    frontMatter: Record<string, unknown>
  }
}
