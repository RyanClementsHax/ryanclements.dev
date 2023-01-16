import { SocialLink } from 'components/icons/SocialLink'
import { INITIAL_YEAR } from 'lib/constants'
import { getCurrentYear } from 'lib/utils'
import { socialAccounts } from 'lib/content'
import Link from 'next/link'
import { NavItem, NAV_ITEMS } from 'lib/nav'

export const Footer: React.FC = () => (
  <footer className="flex flex-col items-center gap-8 border-t border-t-borderColor px-5 pt-10 pb-16 text-center md:flex-row md:items-end md:justify-between md:px-8 md:text-start">
    <div className="flex flex-col items-center gap-8 md:items-start">
      <Quote />
      <NavLinks />
      <SocialLinks />
    </div>
    <CopyRight />
  </footer>
)

const Quote = () => (
  <p className="text-on-surface-base-muted">
    &ldquo;I must become a saint, and a great saint.&rdquo; - Max Kolbe
  </p>
)

const NavLinks = () => (
  <ul className="flex gap-4 text-on-surface-base-muted">
    {NAV_ITEMS.map(x => (
      <li key={x.href}>
        <NavLink item={x} />
      </li>
    ))}
  </ul>
)

const NavLink: React.FC<{ item: NavItem }> = ({ item: { href, name } }) => (
  <Link href={href}>{name}</Link>
)

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

const CopyRight = () => (
  <p className="text-on-surface-base-muted">
    &copy; {getCopyRightYearRange()} Ryan Clements. All rights reserved.
  </p>
)

const getCopyRightYearRange = () =>
  getCurrentYear() === INITIAL_YEAR
    ? INITIAL_YEAR.toString()
    : `${INITIAL_YEAR} - ${getCurrentYear()}`
