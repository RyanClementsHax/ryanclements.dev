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

export class ImageManager {
  constructor(private rootDir: string) {}

  public async exists(src: string): Promise<boolean> {
    return await stat(this.getFullPath(src))
      .then(() => true)
      .catch(() => false)
  }

  public async getOptimizedImageProperties(
    src: string
  ): Promise<OptimizedImageProps> {
    const { base64, img } = await getPlaiceholder(this.asAbsolutePath(src), {
      dir: this.rootDir,
      removeAlpha: false
    })
    return {
      ...img,
      blurDataURL: base64
    }
  }

  private asAbsolutePath(src: string) {
    return path.join('/', src)
  }

  private getFullPath(src: string) {
    return path.join(this.rootDir, src)
  }
}

export const imageManager = new ImageManager('public')
