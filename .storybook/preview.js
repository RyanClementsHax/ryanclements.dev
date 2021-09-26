import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import I18nProvider from 'next-translate/I18nProvider'

import index from 'locales/en/index.json'
import components from 'locales/en/components.json'

import '../styles/global.scss'

export const decorators = [
  Story => (
    <I18nProvider lang="en" namespaces={{ index, components }}>
      <UserProvider>
        <Story />
      </UserProvider>
    </I18nProvider>
  )
]

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
