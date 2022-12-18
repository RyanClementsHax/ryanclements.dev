import { getAllPostSlugs, getPost, Post } from 'lib/posts'
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
import rehypeParse from 'rehype-parse'
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
    props: serialize({
      post
    })
  }
}

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  function (props) {
    const {
      post: { meta, content }
    } = deserialize<PostPageProps>(props)
    const children = useParsedHtml(content)

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

const useParsedHtml = (content: string) =>
  useMemo(
    () =>
      unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, { createElement, Fragment })
        .processSync(content).result,
    [content]
  )
