import { videoService } from 'lib/content/posts/videoService'

void (async () => {
  const replaceExisting =
    process.argv.includes('--replace-existing') || process.argv.includes('-r')
  await videoService.optimizeAllGifs(replaceExisting)
})()
