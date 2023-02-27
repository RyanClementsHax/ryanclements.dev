import { getAllPostSlugs } from 'lib/content/posts'
import { PostDetails } from 'components/pages/posts/[slug]'
import { getRenderablePost } from 'lib/pages/posts/[slug]'
import { Metadata } from 'next'
import { SITE_URL } from 'lib/constants'

interface Params {
  slug: string
}

export async function generateStaticMetadata({
  params: { slug }
}: {
  params: Params
}): Promise<Metadata> {
  const post = await getRenderablePost(slug)
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/posts/${slug}`,
      authors: [`${SITE_URL}/about`],
      publishedTime: post.meta.publishedOnIso,
      images: [
        {
          url: `${SITE_URL}${post.meta.bannerSrc.src}`,
          width: post.meta.bannerSrc.width,
          height: post.meta.bannerSrc.height,
          alt: post.meta.bannerSrc.alt
        }
      ]
    }
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  const postSlugs = await getAllPostSlugs()
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
