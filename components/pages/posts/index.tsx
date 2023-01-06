import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { Layout } from 'components/pages/posts/Layout'
import { RenderablePostSummary } from 'lib/content/posts/types'
import Link from 'next/link'

export interface PostsProps {
  posts: RenderablePostSummary[]
}

export const Posts: React.FC<PostsProps> = ({ posts }) => (
  <Layout>
    <Container>
      <Title>My thoughts on the practice of software engineering</Title>
      <PostsList posts={posts} />
    </Container>
  </Layout>
)

const Title: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h1 className="text-4xl font-bold">{children}</h1>
)

const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="mb-10 flex flex-col gap-10 px-5">{children}</div>
)

const PostsList: React.FC<{ posts: RenderablePostSummary[] }> = ({ posts }) => (
  <div className="flex flex-col gap-5">
    {posts.map(x => (
      <PostSummaryCard key={x.slug} post={x} />
    ))}
  </div>
)

const PostSummaryCard: React.FC<{ post: RenderablePostSummary }> = ({
  post
}) => (
  <article className="rounded-xl border border-borderColor bg-surface-base-elevation-100 text-on-surface-base shadow-md">
    <Link href={`posts/${post.slug}`} className="flex flex-col gap-4 p-8">
      <p className="-mb-2 text-sm text-on-surface-base-muted">
        {post.publishedOn ?? <span className="italic">Draft</span>}
      </p>
      <h2 className="font-bold">{post.title}</h2>
      <p className="">{post.description}</p>
      <p className="flex gap-1 text-primary-700 dark:text-primary-400">
        Read more
        <ArrowLongRightIcon className="h-6 w-6 text-primary-500 dark:text-primary-400" />
      </p>
    </Link>
  </article>
)
