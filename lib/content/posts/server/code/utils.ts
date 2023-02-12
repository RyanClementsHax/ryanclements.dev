import { common, createStarryNight } from '@wooorm/starry-night'
import { HastElement, HastTree } from '../../types'
import sourceTsx from '@wooorm/starry-night/lang/source.tsx.js'

export const isMetaValid = (meta: unknown): meta is string =>
  typeof meta === 'string'

export const isPreElement = (
  node: HastTree | HastElement | null
): node is HastElement =>
  !!node && node.type === 'element' && node.tagName === 'pre'

export const getStarryNight = async (): Promise<
  Awaited<ReturnType<typeof createStarryNight>>
> => await createStarryNight([...common, sourceTsx])
