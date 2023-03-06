import { SITE_URL } from 'lib/constants'

export interface VideoServiceConfig {
  readonly siteUrl: string
}

class VideoService {
  constructor(private readonly config: VideoServiceConfig) {}

  public getFullPathForVideoSrc(src: string) {
    return new URL(src, this.config.siteUrl).toString()
  }
}

export const videoService = new VideoService({
  siteUrl: SITE_URL
})
