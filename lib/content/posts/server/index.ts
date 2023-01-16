import { promises as fs } from 'fs'
import path from 'path'
import * as yup from 'yup'
import { log } from 'lib/utils'
import { IS_DEV, IS_PREVIEW } from 'lib/constants'
import { parseFrontMatter } from './frontMatter'
import { validateMarkdown } from './validation'
import { Post, PostSummary } from '../types'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getAllPostSlugs = async (): Promise<string[]> =>
  (await getAllPosts())
    .filter(x => IS_DEV || IS_PREVIEW || !!x.meta.publishedOn)
    .map(x => x.meta.slug)

export const getAllPosts = async (): Promise<Post[]> => {
  const fileStems = await getPostFileStems()
  return await Promise.all(fileStems.map(x => getPost(x)))
}

export const getAllPostSummaries = async (): Promise<PostSummary[]> => {
  const fileStems = await getPostFileStems()
  return await Promise.all(fileStems.map(x => getPostSummary(x)))
}

export const getPost = async (slug: string): Promise<Post> => {
  try {
    const rawPostString = await getRawPostString(slug)
    return await convertRawStringToPost(slug, rawPostString)
  } catch (e: unknown) {
    log.error(`Could not get post for ${slug}`, e)
    throw e
  }
}

export const convertRawStringToPost = async (
  slug: string,
  rawString: string
): Promise<Post> => {
  await validateMarkdown(rawString)
  return {
    meta: await getMetaFromRawString(slug, rawString),
    content: rawString
  }
}

const postMetaSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  publishedOn: yup.date(),
  bannerSrc: yup.string().required(),
  bannerAlt: yup.string().required()
})

const getMetaFromRawString = async (slug: string, rawString: string) => {
  const frontMatter = await parseFrontMatter(slug, rawString)
  return {
    slug,
    ...(await postMetaSchema.validate(frontMatter))
  }
}

const getPostSummary = async (slug: string): Promise<PostSummary> => {
  const post = await getPost(slug)
  return {
    title: post.meta.title,
    slug,
    publishedOn: post.meta.publishedOn,
    description: post.meta.description
  }
}

const getRawPostString = async (slug: string): Promise<string> =>
  await fs.readFile(path.join(postsDirectory, `${slug}.md`), 'utf-8')

const getPostFileStems = async () => {
  try {
    const files = await fs.readdir(postsDirectory)
    return files.map(x => x.replace('.md', ''))
  } catch (e) {
    log.error(`Was not able to read ${postsDirectory}`, e)
    throw e
  }
}
