import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export interface ArrowLinkProps {
  href: string
  children?: React.ReactNode
}

export const ArrowLink: React.FC<ArrowLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    className="flex gap-1 text-primary-700 dark:text-primary-400"
  >
    {children}
    <ArrowLinkIcon />
  </Link>
)

export const ArrowLinkIcon: React.FC = () => (
  <ArrowLongRightIcon className="h-6 w-6 translate-y-[1px]" />
)
