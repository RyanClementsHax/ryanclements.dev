import { PresetBuilder } from './presetBuilder'
import { Plugin } from 'unified'

import { createStarryNight, common } from '@wooorm/starry-night'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { HastElement } from '../types'
import { ElementContent } from 'hast'
import { h } from 'hastscript'
import { pointStart } from 'unist-util-position'

const PREFIX = 'language-'
const removePrefix = (str?: string) => str?.substring(PREFIX.length)

const EXCLUDED_LANGUAGES = ['text', 'txt']

// modified from
// https://github.com/wooorm/starry-night#example-integrate-with-unified-remark-and-rehype
const rehypeHighlightCode: Plugin<[], HastElement> = () => {
  const starryNightPromise = createStarryNight(common)

  return async (tree, file) => {
    const starryNight = await starryNightPromise

    visit(tree, { type: 'element', tagName: 'pre' }, (node, index, parent) => {
      if (!parent || index === null) {
        return
      }

      const code = node.children[0]

      if (
        !code ||
        code.type !== 'element' ||
        code.tagName !== 'code' ||
        !code.properties
      ) {
        return
      }

      const classes = code.properties.className

      if (!Array.isArray(classes)) return

      const language = removePrefix(
        classes
          .filter((x: unknown): x is string => typeof x === 'string')
          .find(x => x.startsWith(PREFIX))
      )

      if (!language || EXCLUDED_LANGUAGES.includes(language)) {
        return
      }

      const scope = starryNight.flagToScope(language)

      if (!scope) {
        file.fail(`Could not highlight lanugage ${language}`, pointStart(node))
        return
      }

      const fragment = starryNight.highlight(toString(node), scope)

      parent.children[index] = h(
        'div',
        {
          className: [
            'highlight',
            'highlight-' + scope.replace(/^source\./, '').replace(/\./g, '-')
          ]
        },
        [
          {
            ...node,
            children: [
              { ...code, children: fragment.children as ElementContent[] }
            ]
          }
        ]
      )
    })
  }
}

export const codeTransformer = new PresetBuilder()
  .use(rehypeHighlightCode)
  .build()
