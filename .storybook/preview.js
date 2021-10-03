import React from 'react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as NextImage from 'next/image'

import 'styles/global.scss'

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  }
}

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />
})
