import { unified, Preset } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { lintRule } from 'unified-lint-rule'
import { visit } from 'unist-util-visit'
import { reporter } from 'vfile-reporter'
import { pointStart } from 'unist-util-position'
import remarkLint from 'remark-lint'
import { Heading } from 'mdast'

/**
 * To make rules disable-able, you need to name them with the source 'remark-lint'
 * and add the remark-lint plugin
 *
 * https://github.com/remarkjs/remark-lint/blob/cabbe86d1bd12ab5120196474ff08731644142d3/packages/remark-lint/index.js
 */

const remarkLintNoH1 = lintRule('remark-lint:no-h1', (tree, file) => {
  visit(tree, { type: 'heading', depth: 1 }, node => {
    file.fail(
      "Don't use h1 headings (e.g. '# Example') as this messes up a11y because the post's tile will be the h1",
      pointStart(node)
    )
  })
})

const remarkLintNoDeeperThanH3 = lintRule(
  'remark-lint:no-deeper-than-h3',
  (tree, file) => {
    visit(tree, 'heading', (node: Heading) => {
      if (node.depth > 3) {
        file.fail(
          "Don't use headings deeper than h3 (e.g. '#### This is a level 4 heading (h4)') as this can easily confuse readers and make the content harder to follow",
          pointStart(node)
        )
      }
    })
  }
)

// docs on how to configure
// https://github.com/remarkjs/remark-lint
// example preset
// https://github.com/remarkjs/remark-lint/blob/cabbe86d1bd12ab5120196474ff08731644142d3/packages/remark-preset-lint-consistent/index.js
const postQualityPreset: Preset = {
  plugins: [
    [remarkLintNoH1, ['error']],
    [remarkLintNoDeeperThanH3, ['error']]
  ]
}

const validator = unified()
  .use(remarkParse)
  .use(remarkLint)
  .use(postQualityPreset)
  .use(remarkStringify)

export const validateMarkdown = async (rawString: string): Promise<void> => {
  const result = await validator.process(rawString)
  if (result.messages.length) {
    throw new Error(`Invalid markdown\n${reporter(result)}`)
  }
}
