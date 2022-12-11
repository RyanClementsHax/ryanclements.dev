import { SocialLink } from 'components/icons/SocialLink'
import { INITIAL_YEAR } from 'lib/constants'
import { getCurrentYear } from 'lib/dates'
import { socialAccounts } from 'lib/socialAccounts'

export const Footer = () => (
  <footer className="flex flex-col items-center gap-8 border-t border-t-borderColor px-5 pt-10 pb-16 text-center md:flex-row md:justify-between md:px-8">
    <SocialLinks />
    <p className="text-on-surface-base-muted">
      &copy; {getCopyRightYearRange()} Ryan Clements. All rights reserved.
    </p>
  </footer>
)

const getCopyRightYearRange = () =>
  getCurrentYear() === INITIAL_YEAR
    ? INITIAL_YEAR.toString()
    : `${INITIAL_YEAR} - ${getCurrentYear()}`

const SocialLinks = () => (
  <div className="flex gap-6">
    {socialAccounts.map(x => (
      <SocialLink
        key={x.href}
        socialAccount={x}
        className="text-on-surface-base-muted"
      />
    ))}
  </div>
)
