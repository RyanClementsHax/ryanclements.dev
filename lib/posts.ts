import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import * as yup from 'yup'
import { log } from './logs'
import { Root } from 'hast'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getAllPostSlugs = async (): Promise<string[]> => {
  const files = await fs.readdir(postsDirectory)
  return files.map(x => x.replace('.md', ''))
}

export type HastTree = Root

export interface Post {
  meta: PostMeta
  content: HastTree
}

export interface PostMeta {
  title: string
  publishedOn: Date
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
  content: await convertRawStringContentsToHast(rawString)
})

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkRehype)
  .use(rehypeSanitize)

const convertRawStringContentsToHast = async (rawString: string) =>
  await processor.run(processor.parse(rawString))

const postMetaSchema = yup.object({
  title: yup.string().required(),
  publishedOn: yup.date().required()
})

const getMetaFromRawString = async (rawString: string): Promise<PostMeta> => {
  const frontMatter = matter(rawString).data
  return await postMetaSchema.validate(frontMatter)
}
