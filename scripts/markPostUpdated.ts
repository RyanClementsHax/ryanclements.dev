import { markUpdated } from 'lib/content/posts'
import path from 'path'

void (async () => {
  const [, , ...postFilePaths] = process.argv
  const now = new Date()
  for (const postFilePath of postFilePaths) {
    const stem = path.parse(postFilePath).name
    await markUpdated(stem, now)
  }
})()
