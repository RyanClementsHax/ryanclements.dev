import {
  ConfigParameters,
  initAuth0,
  PageRoute,
  WithPageAuthRequiredOptions,
  WithPageAuthRequiredProps
} from '@auth0/nextjs-auth0'
import { WithPageAuthRequiredOptions as WithPageAuthRequiredCSROptions } from '@auth0/nextjs-auth0/dist/frontend'
import { useI18nRoute } from 'lib/i18n/hooks'
import { toI18nRoute } from 'lib/i18n/utils'
import { GetServerSidePropsContext } from 'next'
import React, { ComponentType } from 'react'

const auth0 = initAuth0({
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  authorizationParams: {
    audience: process.env.AUTH0_AUDIENCE
  },
  routes: {
    // needed until this gets resolved
    // https://github.com/auth0/nextjs-auth0/issues/464
    login: `${process.env.AUTH0_BASE_URL}/api/auth/login`
  }
} as ConfigParameters)

export function withI18nPageAuthRequired(
  opts?: WithPageAuthRequiredOptions
): PageRoute
export function withI18nPageAuthRequired<P extends WithPageAuthRequiredProps>(
  Component: ComponentType<P>,
  options?: WithPageAuthRequiredCSROptions
): React.FC<P>
/* eslint-disable @typescript-eslint/indent */
export function withI18nPageAuthRequired(
  optsOrComponent:
    | WithPageAuthRequiredOptions
    | ComponentType<WithPageAuthRequiredProps> = {},
  csrOpts?: WithPageAuthRequiredOptions
): unknown {
  /* eslint-enable @typescript-eslint/indent */
  if (typeof optsOrComponent === 'function') {
    return auth0.withPageAuthRequired(optsOrComponent, {
      ...csrOpts,
      // we are guaranteed to be in a react component when we get here
      // eslint-disable-next-line react-hooks/rules-of-hooks
      returnTo: useI18nRoute(csrOpts?.returnTo)
    })
  } else {
    return async (ctx: GetServerSidePropsContext) => {
      return auth0.withPageAuthRequired({
        ...optsOrComponent,
        returnTo: toI18nRoute(ctx, optsOrComponent.returnTo)
      })(ctx)
    }
  }
}

export default auth0
