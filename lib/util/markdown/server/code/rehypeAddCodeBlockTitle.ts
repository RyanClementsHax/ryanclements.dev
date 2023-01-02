import { Plugin } from 'unified'

import { visit } from 'unist-util-visit'
import { HastTree } from '../../types'
import { h } from 'hastscript'

const titleMatcher = /title=([\w.-]+)/

export const rehypeAddCodeBlockTitle: Plugin<[], HastTree> =
  () => async tree => {
    visit(tree, { type: 'element', tagName: 'div' }, node => {
      if (!node.properties?.dataCodeBlockRoot) {
        return
      }

      const meta = node.data?.meta
      if (typeof meta !== 'string') {
        return
      }

      const title = meta.match(titleMatcher)?.[1]
      if (!title) {
        return
      }

      node.children = [h('div', title), ...node.children]
    })
  }
