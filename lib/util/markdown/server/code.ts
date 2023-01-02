import { PresetBuilder } from './presetBuilder'
import { Plugin } from 'unified'

import { createStarryNight, common } from '@wooorm/starry-night'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { HastElement, HastTree } from '../types'
import { ElementContent } from 'hast'
import { h } from 'hastscript'
import { pointStart } from 'unist-util-position'

const starryNightPromise = createStarryNight(common)

const PREFIX = 'language-'
const removePrefix = (str?: string) => str?.substring(PREFIX.length)

const EXCLUDED_LANGS = ['text', 'txt']

const getClassNamesFromScope = (scope: string) => [
  'highlight',
  'highlight-' + scope.replace(/^source\./, '').replace(/\./g, '-')
]

// modified from
// https://github.com/wooorm/starry-night#example-integrate-with-unified-remark-and-rehype
const rehypeHighlightCodeBlocks: Plugin<[], HastElement> =
  () => async (tree, file) => {
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

      parent.children[index] = h(
        'div',
        {
          className: getClassNamesFromScope(scope)
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

const inlineCodeLangMatcher = /{:([a-zA-z]+)}$/

const rehypeHighlightInlineCode: Plugin<[], HastTree> =
  () => async (tree, file) => {
    const starryNight = await starryNightPromise

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

export const codeTransformer = new PresetBuilder()
  .use(rehypeHighlightCodeBlocks)
  .use(rehypeHighlightInlineCode)
  .build()
