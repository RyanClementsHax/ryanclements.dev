import { Theme } from 'components/theme'
import { A11yStaticImageData } from 'lib/content/images'
import { SocialLinks } from 'components/SocialLinks'
import { Banner } from './Banner'

export interface HeroProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  bannerSrcMap: Record<Theme, A11yStaticImageData>
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  bannerSrcMap
}) => (
  <section className="w-100 h-screen px-5 py-12 md:px-8 md:py-16">
    <div className="grid h-full items-center gap-8 md:container md:mx-auto md:grid-cols-2">
      <Heading title={title} subtitle={subtitle} />
      <Banner srcMap={bannerSrcMap} />
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
  <div className="grid gap-6">
    <h1 className="text-4xl font-bold">{title}</h1>
    <h2 className="text-2xl text-on-surface-base-muted">{subtitle}</h2>
    <SocialLinks />
  </div>
)
