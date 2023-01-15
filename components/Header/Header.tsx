import { ThemeSelect } from 'components/theme'
import { useHideAndShowWithScroll } from 'lib/utils/useHideAndShowWithScroll'
import { useWindowScroll } from 'react-use'
import c from 'classnames'

import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Popover, Transition } from '@headlessui/react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

interface NavItem {
  href: string
  name: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', name: 'Home' },
  { href: '/posts', name: 'Posts' }
]

export interface HeaderProps {
  fixed?: boolean
}

export const Header: React.FC<HeaderProps> = ({ fixed = false }) => {
  const isScrolledToTop = useIsScrolledToTop()
  const { contentRef, headerRef } = useHideAndShowWithScroll<
    HTMLElement,
    HTMLDivElement
  >({ enabled: !fixed })
  return (
    <header ref={headerRef} className={c('z-50', { 'fixed w-full': fixed })}>
      <Popover ref={contentRef}>
        {({ open }) => (
          <div
            className={c(
              // some elements in the header might not render on first paint
              // which is why I specify a min height to prevent layout shift
              // min height needs to be tuned with the hight of what renders
              'min-h-[63px]',
              'flex justify-end border-b bg-surface-base p-3',
              isScrolledToTop
                ? 'border-transparent'
                : [
                    'border-borderColor/75',
                    // background blur causes problems with the overlay and popover panel
                    !open
                      ? 'bg-opacity-60 backdrop-blur-xl backdrop-filter'
                      : ''
                  ]
            )}
          >
            <MobileNav items={NAV_ITEMS} />
            <DesktopNav items={NAV_ITEMS} />
          </div>
        )}
      </Popover>
    </header>
  )
}

const useIsScrolledToTop = () => useWindowScroll().y === 0

const DesktopNav: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <div className="hidden w-full flex-row justify-end gap-6 md:flex">
    <nav>
      <ul className="flex h-full items-center gap-6">
        {items.map(x => (
          <DesktopNavItem key={x.href} item={x} />
        ))}
      </ul>
    </nav>
    <ThemeSelect />
  </div>
)

const DesktopNavItem: React.FC<{ item: NavItem }> = ({
  item: { href, name }
}) => {
  const isActive = useRouter().pathname === href
  return (
    <li>
      <Link
        href={href}
        className={c(
          'relative block transition',
          isActive
            ? 'text-secondary-700 dark:text-secondary-400'
            : 'hover:text-secondary-700 dark:hover:text-secondary-400'
        )}
      >
        {name}
        {isActive && (
          <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-secondary-700/0 via-secondary-700/40 to-secondary-700/0 dark:from-secondary-400/0 dark:via-secondary-400/40 dark:to-secondary-400/0" />
        )}
      </Link>
    </li>
  )
}

const MobileNav: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <div className="md:hidden">
    <Popover.Button className="inline-flex items-center rounded-md border border-borderColor bg-surface-base px-3 py-2 text-sm focus:border-borderColor-focus focus:outline-none focus:ring-1 focus:ring-ringColor-focus">
      Menu
      <ChevronDownIcon className="ml-2 h-4 w-4 text-icon" />
    </Popover.Button>
    <Transition.Root>
      <Transition.Child
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-150 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="fixed inset-x-4 top-8 z-50 origin-top rounded-xl bg-surface-base p-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-on-surface-base-muted">
              Navigation
            </h2>
            <Popover.Button aria-label="Close menu" className="-m-1 p-1">
              <XMarkIcon className="h-6 w-6 text-icon" />
            </Popover.Button>
          </div>
          <nav className="my-2">
            <ul className="divide-y divide-borderColor/50">
              {items.map(x => (
                <MobileNavItem key={x.href} item={x} />
              ))}
            </ul>
          </nav>
          <ThemeSelect />
        </Popover.Panel>
      </Transition.Child>
    </Transition.Root>
  </div>
)

const MobileNavItem: React.FC<{ item: NavItem }> = ({
  item: { href, name }
}) => {
  const isActive = useRouter().pathname === href
  return (
    <li>
      <Popover.Button
        as={Link}
        href={href}
        className={c(
          'block py-4 text-base transition',
          isActive
            ? 'text-secondary-700 dark:text-secondary-400'
            : 'hover:text-secondary-700 dark:hover:text-secondary-400'
        )}
      >
        {name}
      </Popover.Button>
    </li>
  )
}
