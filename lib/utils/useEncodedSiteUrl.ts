import { SITE_URL } from 'lib/constants'
import { usePathname } from 'next/navigation'

export const useEncodedSiteUrl = (): string => {
  const pathname = usePathname()
  return encodeURIComponent(`${SITE_URL}${pathname}`)
}
