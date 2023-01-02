import { Plugin } from 'unified'

import { visit } from 'unist-util-visit'
import { Properties } from 'hast'
import { HastElement, HastTree } from '../../types'
import parseRange from 'parse-numeric-range'

const numericRangeMatcher = /{([0-9,.-\s]*)}/

// inspired by
// https://github.com/Microflash/rehype-starry-night#example-highlight-lines
export const rehypeHighlightCodeBlockLines: Plugin<[], HastTree> =
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
