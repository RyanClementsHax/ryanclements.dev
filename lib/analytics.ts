'use client'

import { usePlausible } from 'next-plausible'
import { useRef } from 'react'

type Analytics = {
  '404': { path: string }
}

export function useAnalytics(): { track404(): void } {
  const notFoundTracked = useRef(false)
  const plausible = usePlausible<Analytics>()
  return {
    track404: () => {
      if (!notFoundTracked.current) {
        plausible('404', { props: { path: document.location.pathname } })
        notFoundTracked.current = true
      }
    }
  }
}
