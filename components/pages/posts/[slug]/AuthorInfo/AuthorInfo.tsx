import { A11yStaticImageData, SocialAccount } from 'lib/content'
import { Author } from 'lib/content/authors'
import Image from 'next/image'
import Link from 'next/link'

export interface AuthorInfoProps {
  author: Author
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ author }) => (
  <AuthorInfoContainer>
    <Avatar src={{ ...author.avatar, alt: author.name }} />
    <div className="flex flex-col gap-1">
      <p>{author.name}</p>
      <SocialLinks socialAccounts={author.socialAccounts} />
    </div>
  </AuthorInfoContainer>
)

const AuthorInfoContainer: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => <div className="flex items-center gap-4">{children}</div>

const Avatar: React.FC<{ src: A11yStaticImageData }> = ({
  src: { alt, ...src }
}) => (
  <Image
    className="rounded-full"
    height={64}
    width={64}
    sizes="64px"
    src={src}
    alt={alt}
  />
)

const SocialLinks: React.FC<{ socialAccounts: SocialAccount[] }> = ({
  socialAccounts
}) => (
  <div className="flex flex-wrap gap-x-4">
    {socialAccounts.map(x => (
      <Link key={x.href} href={x.href} target="_blank">
        {x.platform}
      </Link>
    ))}
  </div>
)
