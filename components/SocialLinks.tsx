import { socialAccounts } from 'lib/content/socialAccounts'
import { RssLink } from './icons/RssLink'
import { SocialLink } from './icons/SocialLink'

export const SocialLinks: React.FC = () => (
  <div className="flex gap-6 text-on-surface-base-muted">
    {socialAccounts.map(x => (
      <SocialLink key={x.href} socialAccount={x} />
    ))}
    <RssLink />
  </div>
)
