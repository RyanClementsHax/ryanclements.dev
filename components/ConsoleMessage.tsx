'use client'

import { logger } from 'lib/utils/logs'
import { useEffect } from 'react'

export const ConsoleMessage: React.FC = () => {
  useEffect(() => {
    logger.log('Ryan Clements')
    logger.log(
      'Full Time Catholic | Full Time Father | Full Stack Engineer | Massive Nerd'
    )
    logger.log("You're a curious one I see ;)")
  }, [])
  return null
}
