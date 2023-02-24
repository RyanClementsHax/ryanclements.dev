import Image from 'next/image'
import { A11yStaticImageData } from 'lib/content/images'
import { SocialLinks } from 'components/SocialLinks'

export interface HeroProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  bannerSrc: A11yStaticImageData
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, bannerSrc }) => (
  <section className="w-100 h-screen px-5 py-12 md:px-8 md:py-16">
    <div className="grid h-full items-center gap-8 md:container md:mx-auto md:grid-cols-2 lg:grid-cols-5">
      <Heading title={title} subtitle={subtitle} />
      <Banner src={bannerSrc} />
    </div>
  </section>
)

const Heading = ({
  title,
  subtitle
}: {
  title: React.ReactNode
  subtitle: React.ReactNode
}) => (
  <div className="grid gap-6 lg:col-span-2">
    <h1 className="text-4xl font-bold">{title}</h1>
    <h2 className="text-2xl text-on-surface-base-muted">{subtitle}</h2>
    <SocialLinks />
  </div>
)

const Banner = ({ src: { alt, ...src } }: { src: A11yStaticImageData }) => (
  <Image
    src={src}
    alt={alt}
    priority
    placeholder="blur"
    // md/lg breakpoints
    sizes="(max-width: 768px) 0, (max-width: 1024px) 50vw, 60vw"
    className="hidden h-full max-h-[500px] rounded-2xl object-cover shadow-lg md:block lg:col-span-3"
  />
)
