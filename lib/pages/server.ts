import { postService } from 'lib/content/posts/postService'
import { cachify } from 'lib/utils/cachify'

export const cachedPostService = cachify(postService, [
  'get',
  'getMeta',
  'getAll',
  'getAllSlugs',
  'getAllSummaries',
  'exists'
])
