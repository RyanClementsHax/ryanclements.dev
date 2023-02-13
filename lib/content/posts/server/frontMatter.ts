import remarkParse from 'remark-parse'
import { unified, Plugin } from 'unified'
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
  const content = String(matter(new VFile(rawString), { strip: true }))
  return stringify(content, frontMatter)
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
  frontMatter.bannerSrc = imageService.getPostBannerFilePath(file.stem)
}

export const frontMatterTransformer = new PresetBuilder()
  .use(remarkFrontmatter)
  .use(remarkParseFrontmatter)
  .use(frontMatterAddBannerSrc)
  .build()

const frontMatterProcessor = unified()
  .use(remarkParse)
  .use(frontMatterTransformer)
  .use(function () {
    this.Compiler = (_, file) => file.data.matter as Record<string, unknown>
  } as Plugin<[], Node, Record<string, unknown>>)
