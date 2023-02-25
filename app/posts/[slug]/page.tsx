import { getAllPostSlugs } from 'lib/content/posts/server'
import { PostDetails } from 'components/pages/posts/[slug]'
import { getSerializableRenderablePost } from 'lib/pages/posts/[slug]'

interface Params {
  slug: string
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
  const post = await getSerializableRenderablePost(slug)
  return (
    <>
      {/* <NextSeo
        title={post.meta.title}
        description={post.meta.description}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: post.meta.publishedOnIso,
            authors: [`${SITE_URL}/about`]
          },
          images: [
            {
              url: `${SITE_URL}${post.meta.bannerSrc.src}`,
              width: post.meta.bannerSrc.width,
              height: post.meta.bannerSrc.height,
              alt: post.meta.bannerSrc.alt
            }
          ]
        }}
      /> */}
      <PostDetails post={post} />
    </>
  )
}
