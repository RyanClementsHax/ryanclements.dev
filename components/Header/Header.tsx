'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Popover, Transition } from '@headlessui/react'
import c from 'classnames'
import { ThemeSelect } from 'components/theme'
import { NavItem, NAV_ITEMS } from 'lib/nav'
import { useHideAndShowWithScroll } from 'lib/utils/useHideAndShowWithScroll'
import { useIsScrolledToTop } from 'lib/utils/useIsScrolledToTop'

export interface HeaderProps {
  hideWithScroll?: boolean
}

export const Header: React.FC<HeaderProps> = ({ hideWithScroll = false }) => {
  const isScrolledToTop = useIsScrolledToTop()
  const { contentRef, headerRef } = useHideAndShowWithScroll<
    HTMLElement,
    HTMLDivElement
  >({ enabled: hideWithScroll })
  return (
    <header
      ref={headerRef}
      className={c('z-50', {
        'fixed w-full': !hideWithScroll
      })}
    >
      <Popover ref={contentRef} className="z-10">
        {({ open }) => (
          <div
            className={c(
              'flex items-center justify-end border-b bg-surface-base py-3 pr-3',
              isScrolledToTop
                ? 'border-transparent'
                : [
                    'border-borderColor/75',
                    // background blur causes problems with the overlay and popover panel
                    !open && 'bg-opacity-60 backdrop-blur-xl backdrop-filter'
                  ]
            )}
          >
            <Link
              href="/"
              className="spacing mr-auto pl-5 text-lg font-semibold tracking-wider md:pl-8"
            >
              Ryan&nbsp;Clements
            </Link>
            <MobileNav items={NAV_ITEMS} />
            <DesktopNav items={NAV_ITEMS} />
          </div>
        )}
      </Popover>
    </header>
  )
}

const DesktopNav: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <div className="hidden w-full flex-row justify-end gap-6 md:flex">
    <nav>
      <ul className="flex h-full items-center gap-6">
        {items.map(x => (
          <li key={x.href}>
            <DesktopNavLink item={x} />
          </li>
        ))}
      </ul>
    </nav>
    <ThemeSelect />
  </div>
)

const DesktopNavLink: React.FC<{ item: NavItem }> = ({
  item: { href, name }
}) => {
  const isActive = useIsActive(href)
  return (
    <Link
      href={href}
      className={c('relative block transition', { active: isActive })}
    >
      {name}
      {isActive && (
        <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-accent-700/0 via-accent-700/40 to-accent-700/0 dark:from-accent-400/0 dark:via-accent-400/40 dark:to-accent-400/0" />
      )}
    </Link>
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
          className="card fixed inset-x-4 top-8 z-50 origin-top"
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
                <li key={x.href}>
                  <MobileNavLink item={x} />
                </li>
              ))}
            </ul>
          </nav>
          <ThemeSelect />
        </Popover.Panel>
      </Transition.Child>
    </Transition.Root>
  </div>
)

const MobileNavLink: React.FC<{ item: NavItem }> = ({
  item: { href, name }
}) => {
  const isActive = useIsActive(href)
  return (
    <Popover.Button
      as={Link}
      href={href}
      className={c('block py-4 text-base transition', { active: isActive })}
    >
      {name}
    </Popover.Button>
  )
}

const useIsActive = (href: string) => usePathname() === href
