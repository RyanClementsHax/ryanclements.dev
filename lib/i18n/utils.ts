import { GetServerSidePropsContext } from 'next'
import { NextRouter } from 'next/router'

export function toI18nRoute(
  ctx: GetServerSidePropsContext,
  route?: string
): string
export function toI18nRoute(router: NextRouter, route?: string): string
export function toI18nRoute(
  ctxOrRouter: GetServerSidePropsContext | NextRouter,
  route: string = 'resolvedUrl' in ctxOrRouter
    ? ctxOrRouter.resolvedUrl
    : ctxOrRouter.route
): string {
  return ctxOrRouter.locale === ctxOrRouter.defaultLocale
    ? route
    : `/${ctxOrRouter.locale}${route}`
}
