import { Plugin } from 'unified'

import { visit } from 'unist-util-visit'
import { HastTree } from '../../types'
import { ElementContent } from 'hast'

// modified from
// https://github.com/wooorm/starry-night#example-adding-line-numbers
export const rehypeGroupCodeBlockLines: Plugin<[], HastTree> =
  () => async code => {
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
