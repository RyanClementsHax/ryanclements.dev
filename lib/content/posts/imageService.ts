import { stat, readFile } from 'fs/promises'
import { POSTS_DIR, ASSET_DIR } from 'lib/constants'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'
import sharp from 'sharp'

export interface OptimizedImageProps {
  blurDataURL: string
  src: string
  height: number
  width: number
  type?: string
}

export interface ImageServiceConfig {
  readonly assetDir: string
  readonly postsDir: string
  readonly postBannerFileName: string
  readonly ogConfig: {
    fileName: string
    width: number
    height: number
  }
}

export class ImageService {
  constructor(readonly config: ImageServiceConfig) {}

  public async exists(src: string): Promise<boolean> {
    return await stat(this.#getFullPath(src))
      .then(() => true)
      .catch(() => false)
  }

  public async getOptimizedImageProperties(
    src: string
  ): Promise<OptimizedImageProps> {
    const imageBuffer = await this.#resolveFile(src)
    const { base64, metadata } = await getPlaiceholder(imageBuffer, {
      removeAlpha: false
    })
    return {
      ...metadata,
      src: this.#asAbsolutePath(src),
      blurDataURL: base64
    }
  }

  public getPostBannerSrc(slug: string): string {
    return path.join(this.config.postsDir, slug, this.config.postBannerFileName)
  }

  public getPostOgSrc(slug: string): string {
    return path.join(this.config.postsDir, slug, this.config.ogConfig.fileName)
  }

  public rewriteSrcForPost(src: string, slug: string): string {
    return path.join(this.config.postsDir, slug, src)
  }

  public async createOgImage(slug: string): Promise<void> {
    const bannerPath = this.#getPostBannerAssetPath(slug)
    const ogPath = this.#getPostOgAssetPath(slug)
    await sharp(bannerPath)
      .resize({
        width: 1024,
        height: 512
      })
      .toFile(ogPath)
  }

  async #resolveFile(src: string) {
    return await readFile(this.#getFullPath(src))
  }

  #asAbsolutePath(src: string) {
    return path.join('/', src)
  }

  #getFullPath(src: string) {
    return path.join(this.config.assetDir, src)
  }

  #getPostBannerAssetPath(slug: string) {
    return path.join(this.config.assetDir, this.getPostBannerSrc(slug))
  }

  #getPostOgAssetPath(slug: string) {
    return path.join(this.config.assetDir, this.getPostOgSrc(slug))
  }
}

export const imageService = new ImageService({
  assetDir: ASSET_DIR,
  postsDir: POSTS_DIR,
  postBannerFileName: 'banner.jpg',
  ogConfig: {
    fileName: 'og.jpg',
    width: 1024,
    height: 512
  }
})
