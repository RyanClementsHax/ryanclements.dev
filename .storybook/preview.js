import React from 'react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  }
}

import * as NextImage from 'next/image'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />
})
