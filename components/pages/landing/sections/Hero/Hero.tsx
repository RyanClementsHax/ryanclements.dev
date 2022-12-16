import Image from 'next/image'
import { SocialLink } from 'components/icons/SocialLink'
import { A11yStaticImageData } from 'lib/images'
import { socialAccounts } from 'lib/socialAccounts'
import { Theme, useTheme } from 'components/theme'

export interface HeroProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  bannerSrcMap: Record<Theme, A11yStaticImageData>
}

export const Hero = ({ title, subtitle, bannerSrcMap }: HeroProps) => (
  <section className="w-100 h-screen px-5 py-12 md:px-8 md:py-16">
    <div className="grid h-full items-center gap-4 md:container md:mx-auto md:grid-cols-2 lg:grid-cols-5">
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
  <div className="grid gap-6 lg:col-span-2">
    <h1 className="text-4xl font-bold text-on-surface-base">{title}</h1>
    <h2 className="text-2xl text-on-surface-base-muted">{subtitle}</h2>
    <SocialLinks />
  </div>
)

const Banner = ({ srcMap }: { srcMap: Record<Theme, A11yStaticImageData> }) => {
  const { theme } = useTheme()
  if (!theme) return null
  const { alt, ...src } = srcMap[theme]
  return (
    <Image
      src={src}
      alt={alt}
      priority
      className="hidden w-full md:block lg:col-span-3"
    />
  )
}

const SocialLinks = () => (
  <div className="flex gap-6">
    {socialAccounts.map(x => (
      <SocialLink
        key={x.href}
        socialAccount={x}
        className="text-on-surface-base-muted"
      />
    ))}
  </div>
)
