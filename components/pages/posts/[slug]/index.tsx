import Image from 'next/image'
import { RenderablePost } from 'lib/pages/posts'
import { MetaCard } from 'components/pages/posts/[slug]/MetaCard'
import { Content } from 'components/pages/posts/[slug]/Content'
import { Layout } from 'components/pages/posts/Layout'
import { A11yStaticImageData } from 'lib/content'

export interface PostDetailsProps {
  post: RenderablePost
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  post: { meta, content }
}) => (
  <Layout>
    <Banner src={meta.bannerSrc} />
    <ContentContainer>
      <MetaCard title={meta.title} publishedOn={meta.publishedOn} />
      <Content root={content} />
    </ContentContainer>
  </Layout>
)

const Banner: React.FC<{ src: A11yStaticImageData }> = ({
  src: { alt, ...src }
}) => (
  <Image
    src={src}
    alt={alt}
    sizes="100vw"
    placeholder="blur"
    priority
    className="relative -z-10 mx-auto aspect-[5/1] max-h-[20rem] w-full max-w-[100rem] object-cover"
  />
)

const ContentContainer: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => (
  <article className="mx-auto -mt-8 mb-16 flex max-w-2xl flex-col gap-10 px-5 text-on-surface-base md:mb-16 md:-mt-16 md:gap-16">
    {children}
  </article>
)
