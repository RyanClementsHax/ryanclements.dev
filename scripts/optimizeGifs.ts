import { videoService } from 'lib/content/posts/videoService'

void (async () => {
  const replaceExisting = process.argv.includes('--replace-existing')
  await videoService.optimizeAllGifs(replaceExisting)
})()
