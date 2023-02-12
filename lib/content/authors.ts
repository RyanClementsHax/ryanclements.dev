import { StaticImageData } from 'next/image'
import myAvatar from 'public/my-avatar.jpg'
import { SocialAccount, socialAccounts } from './socialAccounts'

export interface Author {
  name: string
  avatar: StaticImageData
  socialAccounts: SocialAccount[]
}

export const me: Author = {
  name: 'Ryan Clements',
  avatar: myAvatar,
  socialAccounts
}
