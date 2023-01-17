import { FakeArrowLink } from 'components/FakeArrowLink'
import { A11yStaticImageData } from 'lib/content/images'
import { RenderablePostSummary } from 'lib/pages/posts'
import Link from 'next/link'
import Image from 'next/image'

export interface PostSummaryCardProps {
  post: RenderablePostSummary
}

export const PostSummaryCard: React.FC<PostSummaryCardProps> = ({ post }) => (
  <Container href={`posts/${post.slug}`}>
    <div className="grid sm:grid-cols-[12rem,auto]">
      <Thumbnail src={post.thumbnailSrc} />
      <div className=" flex flex-col gap-4 p-8">
        <PublishedOn date={post.publishedOn} />
        <Title>{post.title}</Title>
        <Description>{post.description}</Description>
        <FakeArrowLink>Read more</FakeArrowLink>
      </div>
    </div>
  </Container>
)

const Container: React.FC<{ href: string; children?: React.ReactNode }> = ({
  href,
  children
}) => (
  <article className="card overflow-hidden bg-surface-base-elevation-100 p-0">
    <Link href={href} className="group">
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

const Thumbnail: React.FC<{ src: A11yStaticImageData }> = ({
  src: { alt, ...src }
}) => (
  <Image
    src={src}
    alt={alt}
    placeholder="blur"
    // md breakpoint
    sizes="(max-width: 768px) 100vw, 12rem"
    className="h-full object-cover"
    // not having this will cause a flash of image without "object-fit: cover" when loading from cache (e.g. reloading browser)
    priority
  />
)
