import Image from 'next/image'
import { HastTree, Post, PostMeta } from 'lib/content/posts/types'
import { MetaCard } from 'components/pages/posts/[slug]/MetaCard'
import { Content } from 'components/pages/posts/[slug]/Content'
import { Layout } from 'components/pages/posts/[slug]/Layout'
import { A11yStaticImageData } from 'lib/content'

export interface RenderablePost extends Omit<Post, 'content' | 'meta'> {
  content: HastTree
  meta: RenderablePostMeta
}

export interface RenderablePostMeta
  extends Omit<PostMeta, 'bannerSrc' | 'bannerAlt' | 'publishedOn'> {
  publishedOn?: string
  bannerSrc: A11yStaticImageData
}

export interface PostPageProps {
  post: RenderablePost
}

export const PostDetails: React.FC<PostPageProps> = ({
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
  <div className="mx-auto -mt-8 mb-10 flex max-w-2xl flex-col gap-10 px-5 text-on-surface-base md:mb-16 md:-mt-16 md:gap-16">
    {children}
  </div>
)
