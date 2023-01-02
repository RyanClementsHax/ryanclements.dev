import { Plugin } from 'unified'

import { createStarryNight, common } from '@wooorm/starry-night'
import { visit } from 'unist-util-visit'
import { HastTree } from '../../types'
import { ElementContent } from 'hast'
import { h } from 'hastscript'
import { pointStart } from 'unist-util-position'

const getClassNamesFromScope = (scope: string) => [
  'highlight',
  'highlight-' + scope.replace(/^source\./, '').replace(/\./g, '-')
]

const inlineCodeLangMatcher = /{:([a-zA-z]+)}$/

export const rehypeHighlightInlineCode: Plugin<[], HastTree> =
  () => async (tree, file) => {
    const starryNight = await createStarryNight(common)

    visit(tree, { type: 'element', tagName: 'code' }, (node, index, parent) => {
      if (!parent || index === null) {
        return
      }

      if (parent.type === 'element' && parent.tagName === 'pre') {
        return
      }

      const child = node.children[0]

      if (!child || child.type !== 'text') {
        return
      }

      const lang = child.value.match(inlineCodeLangMatcher)?.[1]

      if (!lang) {
        return
      }

      const scope = starryNight.flagToScope(lang)

      if (!scope) {
        file.fail(`Could not highlight lanugage ${lang}`, pointStart(node))
        return
      }

      const fragment = starryNight.highlight(
        child.value.replace(inlineCodeLangMatcher, ''),
        scope
      )

      parent.children[index] = h(
        'span',
        {
          className: getClassNamesFromScope(scope),
          'data-testid': 'hello'
        },
        [{ ...node, children: fragment.children as ElementContent[] }]
      )
    })
  }
