import { HastElement, HastTree } from '../../types'

export const isMetaValid = (meta: unknown): meta is string =>
  typeof meta === 'string'

export const isPreElement = (
  node: HastTree | HastElement | null
): node is HastElement =>
  !!node && node.type === 'element' && node.tagName === 'pre'
