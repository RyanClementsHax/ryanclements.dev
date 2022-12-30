import { stat } from 'fs/promises'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

export interface OptimizedImageProps {
  blurDataURL: string
  src: string
  height: number
  width: number
  type?: string
}

export interface ImageServiceConfig {
  readonly rootDir: string
  readonly postsDir: string
  readonly postBannerFileName: string
}

export class ImageService {
  constructor(readonly config: ImageServiceConfig) {}

  public async exists(src: string): Promise<boolean> {
    return await stat(this.getFullPath(src))
      .then(() => true)
      .catch(() => false)
  }

  public async getOptimizedImageProperties(
    src: string
  ): Promise<OptimizedImageProps> {
    const { base64, img } = await getPlaiceholder(this.asAbsolutePath(src), {
      dir: this.config.rootDir,
      removeAlpha: false
    })
    return {
      ...img,
      blurDataURL: base64
    }
  }

  public getPostBannerFilePath(slug: string): string {
    return path.join(this.config.postsDir, slug, this.config.postBannerFileName)
  }

  public rewriteSrcForPost(src: string, slug: string): string {
    return path.join(this.config.postsDir, slug, src)
  }

  private asAbsolutePath(src: string) {
    return path.join('/', src)
  }

  private getFullPath(src: string) {
    return path.join(this.config.rootDir, src)
  }
}

export const imageService = new ImageService({
  rootDir: 'public',
  postsDir: 'posts',
  postBannerFileName: 'banner.jpg'
})
