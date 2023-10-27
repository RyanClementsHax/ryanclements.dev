import { Plugin } from 'unified'

import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { HastElement } from '../types'
import { ElementContent } from 'hast'
import { h } from 'hastscript'
import { pointStart } from 'unist-util-position'
import { getStarryNight } from './utils'

const PREFIX = 'language-'
const removePrefix = (str?: string) => str?.substring(PREFIX.length)

const EXCLUDED_LANGS = ['text', 'txt']

const getClassNamesFromScope = (scope: string) => [
  'highlight',
  'highlight-' + scope.replace(/^source\./, '').replace(/\./g, '-')
]

// modified from
// https://github.com/wooorm/starry-night#example-integrate-with-unified-remark-and-rehype
export const rehypeHighlightCodeBlocks: Plugin<[], HastElement> =
  () => async (tree, file) => {
    const starryNight = await getStarryNight()

    visit(tree, { type: 'element', tagName: 'pre' }, (node, index, parent) => {
      if (!parent || index === undefined) {
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

      const lang = removePrefix(
        classes
          .filter((x: unknown): x is string => typeof x === 'string')
          .find(x => x.startsWith(PREFIX))
      )

      if (!lang || EXCLUDED_LANGS.includes(lang)) {
        return
      }

      const scope = starryNight.flagToScope(lang)

      if (!scope) {
        file.fail(`Could not highlight lanugage ${lang}`, pointStart(node))
        return
      }

      const fragment = starryNight.highlight(toString(node), scope)

      const codeBlockRoot = h(
        'div',
        {
          className: getClassNamesFromScope(scope),
          dataCodeBlockRoot: true
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
      codeBlockRoot.data = {
        ...codeBlockRoot.data,
        meta: code.data?.meta
      }
      parent.children[index] = codeBlockRoot
    })
  }
