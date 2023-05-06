import { imageService } from 'lib/content/posts/imageService'
import { postService } from 'lib/content/posts/postService'

void (async () => {
  const slugs = await postService.getAllSlugs()
  for (const slug of slugs) {
    await imageService.createOgImage(slug)
  }
})()
