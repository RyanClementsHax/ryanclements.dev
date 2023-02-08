import { SITE_URL } from 'lib/constants'
import { DefaultSeo } from 'next-seo'

export const AppSeo: React.FC = () => (
  <DefaultSeo
    defaultTitle="Ryan Clements"
    description="Full Time Catholic | Full Time Father | Full Stack Engineer | Massive Nerd"
    openGraph={{
      url: SITE_URL
    }}
    twitter={{
      site: '@RyanClementsHax',
      handle: '@RyanClementsHax',
      cardType: 'summary_large_image'
    }}
  />
)
