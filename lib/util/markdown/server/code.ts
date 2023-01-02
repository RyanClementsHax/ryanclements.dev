import { PresetBuilder } from './presetBuilder'
import { Plugin } from 'unified'

import { createStarryNight, common } from '@wooorm/starry-night'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { HastElement, HastTree } from '../types'
import { ElementContent, Properties } from 'hast'
import { h } from 'hastscript'
import { pointStart } from 'unist-util-position'
import parseRange from 'parse-numeric-range'

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

const rehypeGroupCodeBlockLines: Plugin<[], HastTree> = () => async code => {
  visit(code, { type: 'element', tagName: 'pre' }, (node, _, parent) => {
    if (!parent) {
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

    const replacement: ElementContent[] = []
    const search = /\r?\n|\r/g
    let index = -1
    let start = 0
    let startTextRemainder = ''
    let lineNumber = 0

    while (++index < code.children.length) {
      const child = code.children[index]

      if (child.type === 'text') {
        let textStart = 0
        let match = search.exec(child.value)

        while (match) {
          // Nodes in this line.
          const line = code.children.slice(start, index) as ElementContent[]

          // Prepend text from a partial matched earlier text.
          if (startTextRemainder) {
            line.unshift({ type: 'text', value: startTextRemainder })
            startTextRemainder = ''
          }

          // Append text from this text.
          if (match.index > textStart) {
            line.push({
              type: 'text',
              value: child.value.slice(textStart, match.index)
            })
          }

          // Add a line, and the eol.
          lineNumber += 1
          replacement.push(createLine(line, lineNumber), {
            type: 'text',
            value: match[0]
          })

          start = index + 1
          textStart = match.index + match[0].length
          match = search.exec(child.value)
        }

        // If we matched, make sure to not drop the text after the last line ending.
        if (start === index + 1) {
          startTextRemainder = child.value.slice(textStart)
        }
      }
    }

    const line = code.children.slice(start) as ElementContent[]
    // Prepend text from a partial matched earlier text.
    if (startTextRemainder) {
      line.unshift({ type: 'text', value: startTextRemainder })
      startTextRemainder = ''
    }

    if (line.length > 0) {
      lineNumber += 1
      replacement.push(createLine(line, lineNumber))
    }

    // Replace children with new array.
    code.children = replacement
  })
}

const createLine = (
  children: ElementContent[],
  line: number
): ElementContent => ({
  type: 'element',
  tagName: 'span',
  properties: { className: 'line', dataLineNumber: line },
  children
})

const numericRangeMatcher = /{([0-9,.-\s]*)}/

const rehypeHighlightCodeBlockLines: Plugin<[], HastTree> =
  () => async tree => {
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

      const meta = code.data?.meta
      if (typeof meta !== 'string') {
        return
      }

      const numericRange = meta.match(numericRangeMatcher)?.[1]

      if (!numericRange) {
        return
      }

      const linesToHighlight = parseRange(numericRange)

      code.children
        .filter((x): x is HastElement => x.type === 'element')
        .map(
          (x, i) =>
            [x, normalizeClassName(x.properties?.className), i + 1] as const
        )
        .filter(([, , lineNumber]) => linesToHighlight.includes(lineNumber))
        .forEach(([line, className]) => {
          line.properties = {
            ...line.properties,
            className: [...className, 'highlighted']
          }
        })
    })
  }

const normalizeClassName = (className: Properties['className']) =>
  Array.isArray(className)
    ? className
    : typeof className == 'string' || typeof className === 'number'
    ? [className]
    : []

export const codeTransformer = new PresetBuilder()
  .use(rehypeHighlightCodeBlocks)
  .use(rehypeHighlightInlineCode)
  .use(rehypeGroupCodeBlockLines)
  .use(rehypeHighlightCodeBlockLines)
  .build()
