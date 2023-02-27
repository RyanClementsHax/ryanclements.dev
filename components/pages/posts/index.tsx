import { Layout } from 'components/Layout'
import { RenderablePostSummary } from 'lib/pages/posts'
import { PostSummaryCard } from 'components/PostSummaryCard'

export interface PostsProps {
  posts: RenderablePostSummary[]
}

export const Posts: React.FC<PostsProps> = ({ posts }) => (
  <Layout>
    <Container>
      <Title>My musings about software engineering</Title>
      <PostsList posts={posts} />
    </Container>
  </Layout>
)

const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="mx-auto mb-16 flex max-w-2xl flex-col gap-10 px-5 pt-16">
    {children}
  </div>
)

const Title: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h1 className="my-10 text-6xl font-bold md:text-8xl">{children}</h1>
)

const PostsList: React.FC<{ posts: RenderablePostSummary[] }> = ({ posts }) => (
  <div className="flex flex-col gap-5">
    {posts.map(x => (
      <PostSummaryCard key={x.slug} post={x} />
    ))}
  </div>
)
