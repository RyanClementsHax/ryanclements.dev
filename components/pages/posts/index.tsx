import { Layout } from 'components/pages/posts/Layout'
import { RenderablePostSummary } from 'lib/pages/posts/[slug]'
import { PostSummaryCard } from './PostSummaryCard'

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
  <h1 className="my-10 text-4xl font-bold md:text-6xl">{children}</h1>
)

const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="mx-auto mb-16 flex max-w-2xl flex-col gap-10 px-5">
    {children}
  </div>
)

const PostsList: React.FC<{ posts: RenderablePostSummary[] }> = ({ posts }) => (
  <div className="flex flex-col gap-5">
    {posts.map(x => (
      <PostSummaryCard key={x.slug} post={x} />
    ))}
  </div>
)
