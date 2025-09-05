'use client'

import { useAnalytics } from 'lib/analytics'
import { Redirect } from './Redirect'
import { useEffect } from 'react'

export function Track404(): React.JSX.Element {
  const { track404 } = useAnalytics()

  useEffect(() => {
    track404()
  }, [track404])

  return <Redirect to="/" />
}
