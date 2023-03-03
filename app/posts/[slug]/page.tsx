import { postService } from 'lib/content/posts/postService'
import { PostDetails } from 'components/pages/posts/[slug]'
import {
  getRenderablePost,
  getRenderablePostMeta
} from 'lib/pages/posts/[slug]/server'
import { Metadata } from 'next'
import { SITE_URL } from 'lib/constants'

interface Params {
  slug: string
}

export async function generateMetadata({
  params: { slug }
}: {
  params: Params
}): Promise<Metadata> {
  const meta = await getRenderablePostMeta(slug)
  const images: NonNullable<Metadata['openGraph']>['images'] = [
    {
      url: `${SITE_URL}${meta.bannerSrc.src}`,
      width: meta.bannerSrc.width,
      height: meta.bannerSrc.height,
      alt: meta.bannerSrc.alt
    }
  ]
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/posts/${slug}`,
      title: meta.title,
      description: meta.description,
      authors: [`${SITE_URL}/about`],
      publishedTime: meta.publishedOnIso,
      images
    },
    twitter: {
      site: '@RyanClementsHax',
      creator: '@RyanClementsHax',
      card: 'summary_large_image',
      images
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
  const post = await getRenderablePost(slug)
  return <PostDetails post={post} />
}
