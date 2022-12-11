import { INITIAL_YEAR } from 'lib/constants'
import { getCurrentYear } from 'lib/dates'

export const Footer = () => (
  <footer className="border-t border-t-borderColor px-5 pt-10 pb-16 text-center md:px-8 md:text-right">
    <p className="text-on-surface-base-muted">
      &copy; {getCopyRightYearRange()} Ryan Clements. All rights reserved.
    </p>
  </footer>
)

const getCopyRightYearRange = () =>
  getCurrentYear() === INITIAL_YEAR
    ? INITIAL_YEAR.toString()
    : `${INITIAL_YEAR} - ${getCurrentYear()}`
