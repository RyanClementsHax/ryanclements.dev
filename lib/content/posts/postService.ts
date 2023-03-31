import { promises as fs } from 'fs'
import path from 'path'
import * as yup from 'yup'
import { logger } from 'lib/utils/logs'
import { IS_DEV, IS_PREVIEW } from 'lib/constants'
import { parseFrontMatter, writeFrontMatter } from './frontMatter'
import { validateMarkdown } from './validation'
import { Post, PostMeta, PostSummary } from './types'

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

export interface PostServiceConfig {
  postsDir: string
  postCanBeShown: (publishedOn?: Date) => boolean
}

export class PostService {
  constructor(readonly config: PostServiceConfig) {}

  public async exists(slug: string): Promise<boolean> {
    return await fs
      .stat(this.getPath(slug))
      .then(() => true)
      .catch(() => false)
  }

  public async getAllSlugs(): Promise<string[]> {
    return (await this.getAll()).map(x => x.meta.slug)
  }

  public async getAllSummaries(): Promise<PostSummary[]> {
    const fileStems = await this.getPostFileStems()
    return (
      await Promise.all(fileStems.map(x => this.getPostSummary(x)))
    ).filter(x => this.config.postCanBeShown(x.publishedOn))
  }

  public async getAll(): Promise<Post[]> {
    const fileStems = await this.getPostFileStems()
    return (await Promise.all(fileStems.map(x => this.get(x)))).filter(x =>
      this.config.postCanBeShown(x.meta.publishedOn)
    )
  }

  public async get(slug: string): Promise<Post> {
    try {
      const rawPostString = await this.getRawPostString(slug)
      return await this.convertRawString(slug, rawPostString)
    } catch (e: unknown) {
      logger.error(`Could not get post for ${slug}`, e)
      throw e
    }
  }

  public async getMeta(slug: string): Promise<PostMeta> {
    try {
      const rawPostString = await this.getRawPostString(slug)
      return await this.getMetaFromRawString(slug, rawPostString)
    } catch (e: unknown) {
      logger.error(`Could not get post meta for ${slug}`, e)
      throw e
    }
  }

  public async convertRawString(
    slug: string,
    rawString: string
  ): Promise<Post> {
    await validateMarkdown(rawString)
    return {
      meta: await this.getMetaFromRawString(slug, rawString),
      content: rawString
    }
  }

  public async markUpdated(slug: string, updatedAt: Date): Promise<void> {
    const meta = await this.getMeta(slug)
    if (meta.publishedOn) {
      meta.updatedAt = updatedAt
      await this.updateMeta(meta)
    }
  }

  private async getMetaFromRawString(slug: string, rawString: string) {
    const frontMatter = await parseFrontMatter(slug, rawString)
    return {
      slug,
      ...(await postMetaSchema.validate(frontMatter))
    }
  }

  private async getPostSummary(slug: string): Promise<PostSummary> {
    const post = await this.get(slug)
    return {
      title: post.meta.title,
      slug,
      publishedOn: post.meta.publishedOn,
      description: post.meta.description,
      thumbnailSrc: post.meta.bannerSrc,
      thumbnailAlt: post.meta.bannerAlt
    }
  }

  private async getRawPostString(slug: string) {
    return await fs.readFile(this.getPath(slug), 'utf-8')
  }

  private async writeRawPostString(slug: string, rawString: string) {
    await fs.writeFile(this.getPath(slug), rawString, 'utf-8')
  }

  private async getPostFileStems() {
    try {
      const files = await fs.readdir(this.config.postsDir)
      return files.map(x => x.replace('.md', ''))
    } catch (e) {
      logger.error(`Was not able to read ${this.config.postsDir}`, e)
      throw e
    }
  }

  private getPath(slug: string) {
    return path.join(this.config.postsDir, `${slug}.md`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async updateMeta({ bannerSrc, slug, ...meta }: PostMeta) {
    logger.log(`Marking updated at for ${slug} to ${meta.updatedAt}`)
    let rawPostString = await this.getRawPostString(slug)
    rawPostString = await writeFrontMatter(meta, rawPostString)
    await this.writeRawPostString(slug, rawPostString)
  }
}

export const postService = new PostService({
  postsDir: path.join(process.cwd(), 'posts'),
  postCanBeShown: (publishedOn?: Date): boolean =>
    IS_DEV || IS_PREVIEW || !!publishedOn
})
