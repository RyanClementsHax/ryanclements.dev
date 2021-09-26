import Image from 'next/image'
import { Claims } from '@auth0/nextjs-auth0'
import useTranslation from 'next-translate/useTranslation'

export interface ProfileProps {
  user: Claims
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { t } = useTranslation('components')
  return (
    <Image
      className="rounded-circle"
      height={200}
      width={200}
      src={user.picture}
      alt={t('profile-pic-alt')}
    />
  )
}
