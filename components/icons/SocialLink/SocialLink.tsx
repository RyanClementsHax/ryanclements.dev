import Link from 'next/link'
import { SocialAccount } from 'lib/socialAccounts'
import { SocialPlatform } from 'lib/socialAccounts'
import { GithubIcon } from 'components/icons/GithubIcon'
import { LinkedInIcon } from 'components/icons/LinkedInIcon'
import { TwitterIcon } from 'components/icons/TwitterIcon'

export interface SocialLinkProps {
  socialAccount: SocialAccount
  className?: string
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  socialAccount,
  className
}) => (
  <Link href={socialAccount.href} className={className}>
    <span className="sr-only">{`Link to ${socialAccount.platform}`}</span>
    {socialPlatformToIconMap[socialAccount.platform]}
  </Link>
)

const socialPlatformToIconMap: Record<SocialPlatform, React.ReactNode> = {
  [SocialPlatform.Github]: <GithubIcon />,
  [SocialPlatform.Twitter]: <TwitterIcon />,
  [SocialPlatform.LinkedIn]: <LinkedInIcon />
}
