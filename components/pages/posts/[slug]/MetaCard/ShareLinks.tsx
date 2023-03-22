'use client'

import { FacebookIcon } from 'components/icons/FacebookIcon'
import { LinkedInIcon } from 'components/icons/LinkedInIcon'
import { RedditIcon } from 'components/icons/RedditIcon'
import { TwitterIcon } from 'components/icons/TwitterIcon'
import { useEncodedSiteUrl } from 'lib/utils/useEncodedSiteUrl'
import Link from 'next/link'

export const ShareLinks: React.FC<{ title: string }> = ({ title }) => {
  const encodedSiteUrl = useEncodedSiteUrl()
  return (
    <span className="flex gap-4 text-on-surface-base-muted">
      <ShareLink
        href={`https://twitter.com/intent/tweet?source=${encodedSiteUrl}&text=${title}%0A${encodedSiteUrl}`}
        platformName="Twitter"
      >
        <TwitterIcon />
      </ShareLink>
      <ShareLink
        href={`http://www.linkedin.com/shareArticle?mini=true&url=${encodedSiteUrl}&title=${title}&source=${encodedSiteUrl}`}
        platformName="LinkedIn"
      >
        <LinkedInIcon />
      </ShareLink>
      <ShareLink
        href={`http://www.reddit.com/submit?url=${encodedSiteUrl}&title=${title}`}
        platformName="Reddit"
      >
        <RedditIcon />
      </ShareLink>
      <ShareLink
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedSiteUrl}&t=${title}`}
        platformName="Facebook"
      >
        <FacebookIcon />
      </ShareLink>
    </span>
  )
}

const ShareLink: React.FC<{
  href: string
  children: React.ReactNode
  platformName: string
}> = ({ children, href, platformName }) => (
  <Link href={href} target="_blank">
    <span className="sr-only">{`Share on ${platformName}`}</span>
    {children}
  </Link>
)
