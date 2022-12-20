import { getAllPostSlugs, getPost, HastTree, Post, PostMeta } from 'lib/posts'
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'
import { createElement, Fragment, useMemo } from 'react'
import { deserialize, Serializable, serialize } from 'lib/serialization'

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

interface PostPageProps {
  post: Post
}

type StaticProps = Serializable<PostPageProps>

export const getStaticProps: GetStaticProps<
  StaticProps,
  StaticPathParams
> = async ({ params }) => {
  const { slug } = params as StaticPathParams
  const post = await getPost(slug)
  return {
    props: {
      post: serializePost(post)
    }
  }
}

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  function ({ post }) {
    const { content, meta } = deserializePost(post)
    const children = useReactFromHast(content)

    return (
      <div className="text-on-surface-base">
        <pre>
          <code>{JSON.stringify(meta, null, 2)}</code>
        </pre>
        <div>{children}</div>
      </div>
    )
  }

export default PostPage

const useReactFromHast = (content: HastTree) =>
  useMemo(
    () =>
      unified()
        .use(rehypeReact, { createElement, Fragment })
        .stringify(content),
    [content]
  )

const serializePost = (post: Post): Serializable<Post> => ({
  ...post,
  meta: serialize(post.meta)
})

const deserializePost = (post: Serializable<Post>): Post => ({
  ...post,
  meta: deserialize<PostMeta>(post.meta)
})
