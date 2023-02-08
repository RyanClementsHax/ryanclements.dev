import { SITE_URL } from 'lib/constants'
import { NextSeo, NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

export const PageSeo: React.FC<NextSeoProps> = props => {
  const { asPath } = useRouter()
  return (
    <NextSeo
      {...props}
      openGraph={{
        url: `${SITE_URL}${asPath}`,
        ...props.openGraph
      }}
    />
  )
}
