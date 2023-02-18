import { useWindowScroll } from 'react-use'
import { useIsMounted } from './useIsMounted'

export const useIsScrolledToTop = (): boolean => {
  const isMounted = useIsMounted()
  const { y } = useWindowScroll()
  return isMounted ? y == 0 : false
}
