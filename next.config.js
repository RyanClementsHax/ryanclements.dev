// I'd love to convert this to .mjs but typescript doesn't suport .mjs yet https://github.com/microsoft/TypeScript/issues/15416
// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-expect-error: there are no typings for this module
const withPlugins = require('next-compose-plugins')
// @ts-expect-error: there are no typings for this module
const withBundleAnalyzer = require('@next/bundle-analyzer')

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  experimental: { esmExternals: true }
}

module.exports = withPlugins(
  [
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true'
    })
  ],
  config
)
