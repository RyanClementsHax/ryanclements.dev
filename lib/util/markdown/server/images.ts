import { Plugin } from 'unified'
import { HastElement } from '../types'
import { visit } from 'unist-util-visit'
import { pointStart } from 'unist-util-position'
import { ImageService, imageService } from 'lib/util/images'
import { PresetBuilder } from './presetBuilder'

const rehypeOptimizeImages: Plugin = () => async (tree, file) => {
  const imageOptimizationJobs: Promise<void>[] = []
  const optimizeImage = async (
    node: HastElement,
    src: string,
    imageService: ImageService
  ) => {
    if (!(await imageService.exists(src))) {
      file.fail(
        `The src "${src}" does not exist as a file within root dir "${imageService.config.rootDir}"`,
        pointStart(node)
      )
      return
    }
    const { blurDataURL, ...props } =
      await imageService.getOptimizedImageProperties(src)
    node.properties = {
      ...node.properties,
      ...props,
      'data-blurdataurl': blurDataURL
    }
  }
  visit(tree, { type: 'element', tagName: 'img' }, (node: HastElement) => {
    if (!node.properties?.src || typeof node.properties.src !== 'string') {
      file.fail(
        'All images need a src property of type string',
        pointStart(node)
      )
      return
    }
    imageOptimizationJobs.push(
      optimizeImage(node, node.properties.src, imageService)
    )
  })
  await Promise.all(imageOptimizationJobs)
}

const rehypeRewriteImageSrcs: Plugin = () => async (tree, file) => {
  visit(tree, { type: 'element', tagName: 'img' }, (node: HastElement) => {
    if (!file.stem) {
      file.fail(
        'In order for image paths to be rewritten properly, the file slug must be included with the content'
      )
      return
    }
    if (!node.properties?.src || typeof node.properties.src !== 'string') {
      file.fail(
        'All images need a src property of type string',
        pointStart(node)
      )
      return
    }
    node.properties.src = imageService.rewriteSrcForPost(
      node.properties.src,
      file.stem
    )
  })
}

export const imageTransformer = new PresetBuilder()
  .use(rehypeRewriteImageSrcs)
  .use(rehypeOptimizeImages)
  .build()
