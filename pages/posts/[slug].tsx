import { getAllPostSlugs, getPost, Post, PostMeta } from 'lib/content/posts'
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { deserialize, Serializable, serialize } from 'lib/util/serialization'
import { parseToHast, HastTree, useReactFromHast } from 'lib/util/parsing'

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

interface ParsedPost extends Omit<Post, 'content'> {
  content: HastTree
}

interface PostPageProps {
  post: ParsedPost
}

export const getStaticProps: GetStaticProps<
  Serializable<PostPageProps>,
  StaticPathParams
> = async ({ params }) => {
  const { slug } = params as StaticPathParams
  const post = await getPost(slug)
  const parsedPost = await parsePost(post)
  return {
    props: {
      post: serializePost(parsedPost)
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

const parsePost = async (post: Post): Promise<ParsedPost> => ({
  ...post,
  content: await parseToHast(post.content)
})

const serializePost = (post: ParsedPost): Serializable<ParsedPost> => ({
  ...post,
  meta: serialize(post.meta)
})

const deserializePost = (post: Serializable<ParsedPost>): ParsedPost => ({
  ...post,
  meta: deserialize<PostMeta>(post.meta)
})
