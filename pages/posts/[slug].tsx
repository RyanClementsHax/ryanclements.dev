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
              url: 'https://res.cloudinary.com/kentcdodds-com/image/upload/$th_1256,$tw_2400,$gw_$tw_div_24,$gh_$th_div_12/co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_14,h_$gh,x_$gw_mul_1.5,y_$gh_mul_1.3,l_text:kentcdodds.com:Matter-Regular.woff2_50:Check%2520out%2520this%2520article/co_white,c_fit,g_north_west,w_$gw_mul_13.5,h_$gh_mul_7,x_$gw_mul_1.5,y_$gh_mul_2.3,l_text:kentcdodds.com:Matter-Regular.woff2_110:Get%2520a%2520catch%2520block%2520error%2520message%2520with%2520TypeScript/c_fit,g_north_west,r_max,w_$gw_mul_4,h_$gh_mul_3,x_$gw,y_$gh_mul_8,l_kent:profile-transparent/co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_5.5,h_$gh_mul_4,x_$gw_mul_4.5,y_$gh_mul_9,l_text:kentcdodds.com:Matter-Regular.woff2_70:Kent%20C.%20Dodds/co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_9,x_$gw_mul_4.5,y_$gh_mul_9.8,l_text:kentcdodds.com:Matter-Regular.woff2_40:kentcdodds.com%252Fblog%252Fget-a-catch-block-error-message-with-typescript/c_fill,ar_3:4,r_12,g_east,h_$gh_mul_10,x_$gw,l_unsplash:photo-1525785967371-87ba44b3e6cf/c_fill,w_$tw,h_$th/kentcdodds.com/social-background.png',
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
