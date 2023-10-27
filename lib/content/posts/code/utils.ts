import { common, createStarryNight } from '@wooorm/starry-night'
// @ts-expect-error The typescript support for this is poor
// but this is how you import a single source
// https://github.com/wooorm/starry-night/releases/tag/3.0.0
import sourceTsx from '@wooorm/starry-night/source.tsx'

import { HastElement, HastTree } from '../types'

export const isMetaValid = (meta: unknown): meta is string =>
  typeof meta === 'string'

export const isPreElement = (
  node: HastTree | HastElement | undefined
): node is HastElement =>
  !!node && node.type === 'element' && node.tagName === 'pre'

export const getStarryNight = async (): Promise<
  Awaited<ReturnType<typeof createStarryNight>>
> => await createStarryNight([...common, sourceTsx])
