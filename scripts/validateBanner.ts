import fs from 'fs/promises'
import path from 'path'

const MAX_BANNER_SIZE_IN_BYTES = 1.5 * 1000 * 1000

const getValidationResult = async (bannerFilePath: string) =>
  await fs.stat(bannerFilePath).then(x => ({
    path: path.relative(process.cwd(), bannerFilePath),
    isValid: x.size <= MAX_BANNER_SIZE_IN_BYTES
  }))

void (async () => {
  const [, , ...bannerFilePaths] = process.argv
  const results = await Promise.all(
    bannerFilePaths.map(x => getValidationResult(x))
  )
  const invalidResults = results.filter(x => !x.isValid)
  if (invalidResults.length) {
    const message = `The following banners were greater than ${
      MAX_BANNER_SIZE_IN_BYTES / 1000 / 1000
    }MB which is very large.\n${invalidResults.map(x => `\t- ${x.path}\n`)}`
    throw new Error(message)
  }
})()
