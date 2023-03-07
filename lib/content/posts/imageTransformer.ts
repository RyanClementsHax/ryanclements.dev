import { Plugin } from 'unified'
import { HastElement, HastTree } from './types'
import { visit } from 'unist-util-visit'
import { pointStart } from 'unist-util-position'
import { ImageService, imageService } from './imageService'
import { PresetBuilder } from './presetBuilder'
import { h } from 'hastscript'
import { videoService } from './videoService'

const rehypeOptimizeImages: Plugin<[], HastTree> = () => async (tree, file) => {
  const imageOptimizationJobs: Promise<void>[] = []
  const optimizeImage = async (
    node: HastElement,
    src: string,
    imageService: ImageService
  ) => {
    if (!(await imageService.exists(src))) {
      file.fail(
        `The src "${src}" does not exist as a file within asset dir "${imageService.config.assetDir}"`,
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
  visit(tree, { type: 'element', tagName: 'img' }, node => {
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

const rehypeRewriteImageSrcs: Plugin<[], HastTree> =
  () => async (tree, file) => {
    visit(tree, { type: 'element', tagName: 'img' }, node => {
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

const rehypeConvertTopLevelImagesToFigures: Plugin<[], HastTree> =
  () => async tree => {
    tree.children
      .map((x, i) => [x, i] as const)
      .filter((x): x is [HastElement, number] => x[0].type === 'element')
      .filter(([x]) => x.tagName === 'p')
      .filter(([x]) => x.children.length === 1)
      .filter(
        ([x]) =>
          x.children[0].type === 'element' && x.children[0].tagName === 'img'
      )
      .map(([x, i]) => [x.children[0] as HastElement, i] as const)
      .forEach(
        ([img, i]) =>
          (tree.children[i] = h('figure', [
            img,
            h('figcaption', img.properties?.alt as string | undefined)
          ]))
      )
  }

const rehypeVideo: Plugin<[], HastTree> = () => async tree => {
  visit(tree, { type: 'element', tagName: 'img' }, (node, index, parent) => {
    if (!parent || index === null) {
      return
    }
    const src = node.properties?.src
    const extRegex = /\.(webm|mp4)$/
    if (typeof src === 'string' && extRegex.test(src)) {
      const path = videoService.getPathForVideoSrc(src)
      parent.children[index] = h('video', [
        h('source', {
          src: path.replace(extRegex, '.webm'),
          type: 'video/webm'
        }),
        h('source', {
          src: path.replace(extRegex, '.mp4'),
          type: 'video/mp4'
        })
      ])
    }
  })
}

export const imageTransformer = new PresetBuilder()
  .use(rehypeRewriteImageSrcs)
  .use(rehypeVideo)
  .use(rehypeOptimizeImages)
  .use(rehypeConvertTopLevelImagesToFigures)
  .build()
