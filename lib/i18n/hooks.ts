import { useRouter } from 'next/router'
import { toI18nRoute } from './utils'

export const useI18nRoute = (route?: string): string => {
  const router = useRouter()
  return toI18nRoute(router, route)
}
