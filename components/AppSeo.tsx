import { SITE_URL } from 'lib/constants'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'

export const AppSeo: React.FC = () => {
  const { asPath } = useRouter()
  return (
    <DefaultSeo
      defaultTitle="Ryan Clements"
      description="Full Time Catholic | Full Time Father | Full Stack Engineer | Massive Nerd"
      openGraph={{
        url: `${SITE_URL}${asPath}`
      }}
      twitter={{
        site: '@RyanClementsHax',
        handle: '@RyanClementsHax',
        cardType: 'summary_large_image'
      }}
    />
  )
}
