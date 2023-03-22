import { postService } from 'lib/content/posts/postService'
import { PostDetails } from 'components/pages/posts/[slug]'
import {
  getRenderablePost,
  getRenderablePostMeta
} from 'lib/pages/posts/[slug]/server'
import { Metadata } from 'next'
import { SITE_URL } from 'lib/constants'
import { notFound } from 'next/navigation'

interface Params {
  slug: string
}

export async function generateMetadata({
  params: { slug }
}: {
  params: Params
}): Promise<Metadata> {
  await redirectIfNotFound(slug)
  const meta = await getRenderablePostMeta(slug)
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/posts/${slug}`,
      title: meta.title,
      description: meta.description,
      authors: [`${SITE_URL}/about`],
      publishedTime: meta.publishedOnIso
    },
    twitter: {
      site: '@RyanClementsHax',
      creator: '@RyanClementsHax',
      card: 'summary_large_image'
    },
    other: {
      'og:image': `${SITE_URL}${meta.bannerSrc.src}`,
      'og:image:width': meta.bannerSrc.width,
      'og:image:height': meta.bannerSrc.height,
      'og:image:alt': meta.bannerSrc.alt
    }
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  const postSlugs = await postService.getAllSlugs()
  return postSlugs.map(x => ({ slug: x }))
}

export default async function PostPage({
  params: { slug }
}: {
  params: Params
}): Promise<JSX.Element> {
  await redirectIfNotFound(slug)
  const post = await getRenderablePost(slug)
  return <PostDetails post={post} />
}

const redirectIfNotFound = async (slug: string) => {
  if (!(await postService.exists(slug))) {
    notFound()
  }
}
