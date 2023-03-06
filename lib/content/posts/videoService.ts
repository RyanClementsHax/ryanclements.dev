import { execa, execaCommand } from 'execa'
import { stat } from 'fs/promises'
import { glob } from 'glob'
import { POSTS_DIR, ASSET_DIR, SITE_URL } from 'lib/constants'
import { logger } from 'lib/utils/logs'
import path from 'path'

export interface VideoServiceConfig {
  readonly siteUrl: string
  readonly assetDir: string
  readonly postsDir: string
}

class VideoService {
  constructor(private readonly config: VideoServiceConfig) {}

  public getFullPathForVideoSrc(src: string) {
    return new URL(src, this.config.siteUrl).toString()
  }

  public async optimizeAllGifs() {
    if (!(await this.ffmpegIsInstalled())) {
      throw new Error(
        'Must install ffmpeg to optimize gifs. See readme for instructions.'
      )
    }

    const gifPaths = await this.findAllGifPaths()

    await Promise.all(gifPaths.map(x => this.transformGif(x)))
  }

  private async ffmpegIsInstalled() {
    return await execa('ffmpeg', ['-h'])
      .then(() => true)
      .catch(() => false)
  }

  private async findAllGifPaths() {
    return await glob(
      `${path.join(this.config.assetDir, this.config.postsDir)}/**/*.gif`,
      { absolute: true }
    )
  }

  private async transformGif(gifPath: string) {
    // https://web.dev/replace-gifs-with-videos/
    await this.convertGifToWebm(gifPath)
    await this.convertGifToMp4(gifPath)
  }

  private async convertGifToWebm(gifPath: string) {
    const relativePath = this.getPathRelativeToPostsDirFromAbsolutePath(gifPath)
    const webmPath = gifPath.replace(/\.gif$/, '.webm')
    if (!(await this.exists(webmPath))) {
      logger.log('Performing webm transformation on', relativePath)
      await execaCommand(
        `ffmpeg -i ${gifPath} -c vp9 -b:v 0 -crf 41 ${webmPath}`
      )
    } else {
      logger.log(
        `Skipping webm transform for ${relativePath} as ${webmPath} already exists`
      )
    }
  }

  private async convertGifToMp4(gifPath: string) {
    const relativePath = this.getPathRelativeToPostsDirFromAbsolutePath(gifPath)
    const mp4Path = gifPath.replace(/\.gif$/, '.mp4')
    if (!(await this.exists(mp4Path))) {
      logger.log('Performing mp4 transformation on', relativePath)
      await execaCommand(
        `ffmpeg -i ${gifPath} -c vp9 -b:v 0 -crf 41 ${mp4Path}`
      )
    } else {
      logger.log(
        `Skipping mp4 transform for ${relativePath} as ${mp4Path} already exists`
      )
    }
  }

  private getPathRelativeToPostsDirFromAbsolutePath(absolutePath: string) {
    return path.relative(
      path.join(process.cwd(), this.config.assetDir, this.config.postsDir),
      absolutePath
    )
  }

  private async exists(src: string): Promise<boolean> {
    return await stat(src)
      .then(() => true)
      .catch(() => false)
  }
}

export const videoService = new VideoService({
  siteUrl: SITE_URL,
  assetDir: ASSET_DIR,
  postsDir: POSTS_DIR
})
