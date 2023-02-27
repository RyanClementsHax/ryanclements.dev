import { promises as fs } from 'fs'
import path from 'path'
import * as yup from 'yup'
import { log } from 'lib/utils/logs'
import { IS_DEV, IS_PREVIEW } from 'lib/constants'
import { parseFrontMatter, writeFrontMatter } from './frontMatter'
import { validateMarkdown } from './validation'
import { Post, PostMeta, PostSummary } from './types'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getAllPostSlugs = async (): Promise<string[]> =>
  (await getAllPosts()).map(x => x.meta.slug)

export const getAllPostSummaries = async (): Promise<PostSummary[]> => {
  const fileStems = await getPostFileStems()
  return (await Promise.all(fileStems.map(x => getPostSummary(x)))).filter(x =>
    postCanBeShown(x.publishedOn)
  )
}

export const getAllPosts = async (): Promise<Post[]> => {
  const fileStems = await getPostFileStems()
  return (await Promise.all(fileStems.map(x => getPost(x)))).filter(x =>
    postCanBeShown(x.meta.publishedOn)
  )
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

export const markUpdated = async (
  slug: string,
  updatedAt: Date
): Promise<void> => {
  const meta = await getMeta(slug)
  if (meta.publishedOn) {
    meta.updatedAt = updatedAt
    await updateMeta(meta)
  }
}

const postMetaSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  publishedOn: yup.date().when('updatedAt', {
    is: (val: unknown) => !!val,
    then: schema => schema.required()
  }),
  updatedAt: yup.date(),
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
    description: post.meta.description,
    thumbnailSrc: post.meta.bannerSrc,
    thumbnailAlt: post.meta.bannerAlt
  }
}

const getRawPostString = async (slug: string) =>
  await fs.readFile(path.join(postsDirectory, `${slug}.md`), 'utf-8')

const writeRawPostString = async (slug: string, rawString: string) =>
  await fs.writeFile(
    path.join(postsDirectory, `${slug}.md`),
    rawString,
    'utf-8'
  )

const getPostFileStems = async () => {
  try {
    const files = await fs.readdir(postsDirectory)
    return files.map(x => x.replace('.md', ''))
  } catch (e) {
    log.error(`Was not able to read ${postsDirectory}`, e)
    throw e
  }
}

const getMeta = async (slug: string) => (await getPost(slug)).meta

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateMeta = async ({ bannerSrc, slug, ...meta }: PostMeta) => {
  log.log(`Marking updated at for ${slug} to ${meta.updatedAt}`)
  let rawPostString = await getRawPostString(slug)
  rawPostString = await writeFrontMatter(meta, rawPostString)
  await writeRawPostString(slug, rawPostString)
}

const postCanBeShown = (publishedOn?: Date): boolean =>
  IS_DEV || IS_PREVIEW || !!publishedOn
