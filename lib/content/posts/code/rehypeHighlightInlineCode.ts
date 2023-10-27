import { Plugin } from 'unified'

import { visit } from 'unist-util-visit'
import { HastTree } from '../types'
import { ElementContent } from 'hast'
import { h } from 'hastscript'
import { pointStart } from 'unist-util-position'
import { getStarryNight, isPreElement } from './utils'

const getClassNamesFromScope = (scope: string) => [
  'highlight',
  'highlight-' + scope.replace(/^source\./, '').replace(/\./g, '-')
]

const INLINE_CODE_LANG_MATCHER = /{:([a-zA-z]+)}$/

export const rehypeHighlightInlineCode: Plugin<[], HastTree> =
  () => async (tree, file) => {
    const starryNight = await getStarryNight()

    visit(tree, { type: 'element', tagName: 'code' }, (node, index, parent) => {
      if (isPreElement(parent) || !parent || index === undefined) {
        return
      }

      const child = node.children[0]

      if (child?.type !== 'text') {
        return
      }

      const lang = child.value.match(INLINE_CODE_LANG_MATCHER)?.[1]

      if (!lang) {
        return
      }

      const scope = starryNight.flagToScope(lang)

      if (!scope) {
        file.fail(`Could not highlight lanugage ${lang}`, pointStart(node))
        return
      }

      const fragment = starryNight.highlight(
        child.value.replace(INLINE_CODE_LANG_MATCHER, ''),
        scope
      )

      parent.children[index] = h(
        'span',
        {
          className: getClassNamesFromScope(scope)
        },
        [{ ...node, children: fragment.children as ElementContent[] }]
      )
    })
  }
