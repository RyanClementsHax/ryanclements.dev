import remarkParse from 'remark-parse'
import { unified, Plugin } from 'unified'
import { Node } from 'unist'
import { YAML } from 'mdast'
import { parse } from 'yaml'
import { PresetBuilder } from './presetBuilder'
import remarkFrontmatter from 'remark-frontmatter'
import { visit } from 'unist-util-visit'
import { pointStart } from 'unist-util-position'
import { imageService } from './imageService'

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

const frontMatterAddBannerSrc: Plugin = () => async (_, file) => {
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
    this.Compiler = (_, file) =>
      file.data.frontMatter as Record<string, unknown>
  } as Plugin<[], Node, Record<string, unknown>>)
