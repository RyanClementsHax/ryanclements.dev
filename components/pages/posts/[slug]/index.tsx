import Image from 'next/image'
import { RenderablePost } from 'lib/pages/posts/[slug]/types'
import { MetaCard } from './MetaCard'
import { Content } from './Content'
import { Layout } from 'components/Layout'
import { A11yStaticImageData } from 'lib/content/images'
import Link from 'next/link'

export interface PostDetailsProps {
  post: RenderablePost
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  post: { meta, content }
}) => (
  <Layout hideHeaderWithScroll>
    <Banner src={meta.bannerSrc} />
    <ContentContainer>
      <MetaCard
        title={meta.title}
        publishedOn={meta.publishedOn}
        updatedAt={meta.updatedAt}
      />
      <Content root={content} />
      <Closer />
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
  <article className="mx-auto -mt-8 mb-16 flex max-w-2xl flex-col gap-12 px-5 md:mb-16 md:-mt-16 md:gap-16">
    {children}
  </article>
)

const Closer: React.FC = () => (
  <section className="flex flex-col gap-12">
    <hr className="border-zinc-200 dark:border-zinc-700" />
    <p className="text-center">
      Did you enjoy the post? Consider supporting me and my tea addition 🤗🍵.
    </p>
    <BuyMeACoffeeButton />
  </section>
)

const BuyMeACoffeeButton: React.FC = () => (
  <Link
    href="https://www.buymeacoffee.com/ryanclementshax"
    className="relative block h-12"
  >
    <Image
      src="https://img.buymeacoffee.com/button-api/?text=Buy me a tea&emoji=🍵&slug=ryanclementshax&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff"
      alt="Buy me a coffee"
      fill
      unoptimized
    />
  </Link>
)
