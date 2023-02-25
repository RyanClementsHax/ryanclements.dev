'use client'

import { log } from 'lib/utils/logs'
import { useEffect } from 'react'

export const ConsoleMessage: React.FC = () => {
  useEffect(() => {
    log.log('Ryan Clements')
    log.log(
      'Full Time Catholic | Full Time Father | Full Stack Engineer | Massive Nerd'
    )
    log.log("You're a curious one I see ;)")
  }, [])
  return null
}
