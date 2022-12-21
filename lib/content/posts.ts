import { promises as fs } from 'fs'
import path from 'path'
import * as yup from 'yup'
import { log } from 'lib/util'
import { parseFrontMatter } from 'lib/util/parsing'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getAllPostSlugs = async (): Promise<string[]> => {
  try {
    const files = await fs.readdir(postsDirectory).catch(() => [] as string[])
    return files.map(x => x.replace('.md', ''))
  } catch (e) {
    log.error(`Was not able to read ${postsDirectory}`, e)
    throw e
  }
}

export interface Post {
  meta: PostMeta
  content: string
}

export interface PostMeta {
  title: string
  publishedOn: Date
  bannerSrc: string
}

export const getPost = async (slug: string): Promise<Post> => {
  try {
    const rawPostString = await getRawPostString(slug)
    return await convertRawStringToPost(rawPostString)
  } catch (e: unknown) {
    log.error(`Could not get post for ${slug}`, e)
    throw e
  }
}

const getRawPostString = async (slug: string): Promise<string> =>
  await fs.readFile(path.join(postsDirectory, `${slug}.md`), 'utf-8')

const convertRawStringToPost = async (rawString: string): Promise<Post> => ({
  meta: await getMetaFromRawString(rawString),
  content: rawString
})

const postMetaSchema = yup.object({
  title: yup.string().required(),
  publishedOn: yup.date().required(),
  bannerSrc: yup.string().required()
})

const getMetaFromRawString = async (rawString: string): Promise<PostMeta> => {
  const frontMatter = parseFrontMatter(rawString)
  return await postMetaSchema.validate(frontMatter)
}
