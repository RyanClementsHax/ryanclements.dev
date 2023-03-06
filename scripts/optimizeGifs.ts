import { videoService } from 'lib/content/posts/videoService'

void (async () => {
  await videoService.optimizeAllGifs()
})()
