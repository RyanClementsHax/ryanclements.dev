import s from './IconBadge.module.scss'
import c from 'classnames'

export const IconBadge: React.FC = ({ children }) => (
  <div
    className={c(
      'rounded-full p-4 flex items-center justify-center bg-surface-primary w-6 h-6 text-on-surface-primary',
      s.iconBadge
    )}
  >
    {children}
  </div>
)
