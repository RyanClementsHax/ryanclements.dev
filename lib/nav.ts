export interface NavItem {
  href: string
  name: string
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', name: 'Home' },
  { href: '/posts', name: 'Posts' },
  { href: '/about', name: 'About' }
]
