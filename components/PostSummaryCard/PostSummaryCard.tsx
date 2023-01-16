import { FakeArrowLink } from 'components/FakeArrowLink'
import { RenderablePostSummary } from 'lib/pages/posts'
import Link from 'next/link'

export interface PostSummaryCardProps {
  post: RenderablePostSummary
}

export const PostSummaryCard: React.FC<PostSummaryCardProps> = ({ post }) => (
  <Container href={`posts/${post.slug}`}>
    <PublishedOn date={post.publishedOn} />
    <Title>{post.title}</Title>
    <Description>{post.description}</Description>
    <FakeArrowLink>Read more</FakeArrowLink>
  </Container>
)

const Container: React.FC<{ href: string; children?: React.ReactNode }> = ({
  href,
  children
}) => (
  <article className="card bg-surface-base-elevation-100 p-0">
    <Link href={href} className="group flex flex-col gap-4 p-8">
      {children}
    </Link>
  </article>
)

const PublishedOn: React.FC<{ date?: string }> = ({ date }) => (
  <p className="-mb-2 text-sm text-on-surface-base-muted">
    {date ?? <span className="italic">Draft</span>}
  </p>
)

const Title: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h2 className="font-bold">{children}</h2>
)

const Description: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => <p>{children}</p>
