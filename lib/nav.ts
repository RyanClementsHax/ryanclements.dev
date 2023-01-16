export interface NavItem {
  href: string
  name: string
}

export const navItems: NavItem[] = [
  { href: '/', name: 'Home' },
  { href: '/posts', name: 'Posts' }
]
