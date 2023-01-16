import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { RenderablePostSummary } from 'lib/posts'
import Link from 'next/link'

export interface PostSummaryCardProps {
  post: RenderablePostSummary
}

export const PostSummaryCard: React.FC<PostSummaryCardProps> = ({ post }) => (
  <Container href={`posts/${post.slug}`}>
    <PublishedOn date={post.publishedOn} />
    <Title>{post.title}</Title>
    <Description>{post.description}</Description>
    <ReadMore />
  </Container>
)

const Container: React.FC<{ href: string; children?: React.ReactNode }> = ({
  href,
  children
}) => (
  <article className="card border border-borderColor bg-surface-base-elevation-100">
    <Link href={href} className="flex flex-col gap-4">
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

const ReadMore: React.FC = () => (
  <p className="flex gap-1 text-primary-700 dark:text-primary-400">
    Read more
    <ArrowLongRightIcon className="h-6 w-6 translate-y-[2px] text-primary-500 dark:text-primary-400" />
  </p>
)
