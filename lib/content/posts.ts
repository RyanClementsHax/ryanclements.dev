import { promises as fs } from 'fs'
import path from 'path'
import * as yup from 'yup'
import { log } from 'lib/util'
import { parseFrontMatter, validateMarkdown } from 'lib/util/markdown/server'
import { isDev } from 'lib/constants'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  meta: PostMeta
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  publishedOn?: Date
  bannerSrc: string
}

export const getAllPostSlugs = async (): Promise<string[]> =>
  (await getAllPosts())
    .filter(x => isDev || !!x.meta.publishedOn)
    .map(x => x.meta.slug)

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const files = await fs.readdir(postsDirectory)
    return await Promise.all(
      files.map(x => x.replace('.md', '')).map(x => getPost(x))
    )
  } catch (e) {
    log.error(`Was not able to read ${postsDirectory}`, e)
    throw e
  }
}

export const getPost = async (slug: string): Promise<Post> => {
  try {
    const rawPostString = await getRawPostString(slug)
    await validateMarkdown(rawPostString)
    return await convertRawStringToPost(slug, rawPostString)
  } catch (e: unknown) {
    log.error(`Could not get post for ${slug}`, e)
    throw e
  }
}

const getRawPostString = async (slug: string): Promise<string> =>
  await fs.readFile(path.join(postsDirectory, `${slug}.md`), 'utf-8')

const convertRawStringToPost = async (
  slug: string,
  rawString: string
): Promise<Post> => ({
  meta: {
    slug,
    ...(await getMetaFromRawString(rawString))
  },
  content: rawString
})

const postMetaSchema = yup.object({
  title: yup.string().required(),
  publishedOn: yup.date(),
  bannerSrc: yup.string().required()
})

const getMetaFromRawString = async (rawString: string) => {
  const frontMatter = parseFrontMatter(rawString)
  return await postMetaSchema.validate(frontMatter)
}
