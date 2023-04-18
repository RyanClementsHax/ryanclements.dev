import { execa, execaCommand } from 'execa'
import { stat } from 'fs/promises'
import { glob } from 'glob'
import { POSTS_DIR, ASSET_DIR } from 'lib/constants'
import { logger } from 'lib/utils/logs'
import path from 'path'

export interface VideoServiceConfig {
  readonly assetDir: string
  readonly postsDir: string
}

class VideoService {
  readonly #config: VideoServiceConfig
  constructor(config: VideoServiceConfig) {
    this.#config = config
  }

  public getPathForVideoSrc(src: string) {
    return '/' + src.replace(/^\//, '')
  }

  public async optimizeAllGifs(replaceExisting = false) {
    if (!(await this.#ffmpegIsInstalled())) {
      throw new Error(
        'Must install ffmpeg to optimize gifs. See readme for instructions.'
      )
    }

    const gifPaths = await this.#findAllGifPaths()

    await Promise.all(gifPaths.map(x => this.#transformGif(x, replaceExisting)))
  }

  async #ffmpegIsInstalled() {
    return await execa('ffmpeg', ['-h'])
      .then(() => true)
      .catch(() => false)
  }

  async #findAllGifPaths() {
    return await glob(
      `${path.join(this.#config.assetDir, this.#config.postsDir)}/**/*.gif`,
      { absolute: true }
    )
  }

  async #transformGif(gifPath: string, replaceExisting: boolean) {
    // https://web.dev/replace-gifs-with-videos/
    await this.#convertGifToWebm(gifPath, replaceExisting)
    await this.#convertGifToMp4(gifPath, replaceExisting)
  }

  async #convertGifToWebm(gifPath: string, replaceExisting: boolean) {
    const relativePath =
      this.#getPathRelativeToPostsDirFromAbsolutePath(gifPath)
    const webmPath = gifPath.replace(/\.gif$/, '.webm')
    const transform = async () =>
      await execaCommand(
        `ffmpeg -y -i ${gifPath} -c vp9 -b:v 0 -crf 41 ${webmPath}`
      )
    if (!(await this.#exists(webmPath))) {
      logger.log('Creating webm transformation on', relativePath)
      await transform()
    } else if (replaceExisting) {
      logger.log('Replacing webm transformation for', relativePath)
      await transform()
    } else {
      logger.log(
        `Skipping webm transform for ${relativePath} as ${webmPath} already exists`
      )
    }
  }

  async #convertGifToMp4(gifPath: string, replaceExisting: boolean) {
    const relativePath =
      this.#getPathRelativeToPostsDirFromAbsolutePath(gifPath)
    const mp4Path = gifPath.replace(/\.gif$/, '.mp4')
    const transform = async () =>
      await execaCommand(
        `ffmpeg -y -i ${gifPath} -vf crop=trunc(iw/2)*2:trunc(ih/2)*2 -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p ${mp4Path}`
      )
    if (!(await this.#exists(mp4Path))) {
      logger.log('Creating mp4 transformation on', relativePath)
      await transform()
    } else if (replaceExisting) {
      logger.log('Replacing mp4 transformation on', relativePath)
      await transform()
    } else {
      logger.log(
        `Skipping mp4 transform for ${relativePath} as ${mp4Path} already exists`
      )
    }
  }

  #getPathRelativeToPostsDirFromAbsolutePath(absolutePath: string) {
    return path.relative(
      path.join(process.cwd(), this.#config.assetDir, this.#config.postsDir),
      absolutePath
    )
  }

  async #exists(src: string): Promise<boolean> {
    return await stat(src)
      .then(() => true)
      .catch(() => false)
  }
}

export const videoService = new VideoService({
  assetDir: ASSET_DIR,
  postsDir: POSTS_DIR
})
