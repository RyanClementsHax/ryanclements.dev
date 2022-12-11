export enum SocialPlatform {
  Github = 'Github',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn'
}

export interface SocialAccount {
  href: string
  platform: SocialPlatform
}

export const socialAccounts: SocialAccount[] = [
  {
    href: 'https://twitter.com/ryanclementshax',
    platform: SocialPlatform.Twitter
  },
  {
    href: 'https://github.com/RyanClementsHax',
    platform: SocialPlatform.Github
  },
  {
    href: 'https://www.linkedin.com/in/ryan-clements-hax/',
    platform: SocialPlatform.LinkedIn
  }
]
