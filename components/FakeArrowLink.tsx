import { ArrowLinkIcon } from 'components/ArrowLink'

export interface FakeArrowLinkProps {
  children?: React.ReactNode
}

export const FakeArrowLink: React.FC<FakeArrowLinkProps> = ({ children }) => (
  <p className="flex gap-1 text-primary-700 group-hover:text-accent-700 dark:text-primary-400 dark:group-hover:text-accent-400">
    {children}
    <ArrowLinkIcon />
  </p>
)
