import s from './IconBadge.module.scss'
import c from 'classnames'

export const IconBadge = ({ children }: { children?: React.ReactNode }) => (
  <div
    className={c(
      'flex h-6 w-6 items-center justify-center rounded-full bg-surface-primary p-4 text-on-surface-primary',
      s.iconBadge
    )}
  >
    {children}
  </div>
)
