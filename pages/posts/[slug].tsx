import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { deserialize, Serializable } from 'lib/utils/serialization'
import { getAllPostSlugs } from 'lib/content/posts/server'
import { PostDetails, PostDetailsProps } from 'components/pages/posts/[slug]'
import {
  RenderablePost,
  getSerializableRenderablePost
} from 'lib/pages/posts/[slug]'
import { NextSeo } from 'next-seo'
import { SITE_URL } from 'lib/constants'

interface StaticPathParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const postSlugs = await getAllPostSlugs()
  return {
    paths: postSlugs.map(x => ({ params: { slug: x } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<
  Serializable<PostDetailsProps>,
  StaticPathParams
> = async ({ params }) => {
  const { slug } = params as StaticPathParams
  return {
    props: {
      post: await getSerializableRenderablePost(slug)
    }
  }
}

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post
}) => {
  const deserializedPost = deserialize<RenderablePost>(post)
  return (
    <>
      <NextSeo
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
      />
      <PostDetails post={deserializedPost} />
    </>
  )
}

export default PostPage
