'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export interface RedirectProps {
  to: string
}

export function Redirect({ to }: RedirectProps): React.ReactNode {
  const router = useRouter()
  useEffect(() => {
    void router.replace(to)
  }, [router, to])
  return null
}
