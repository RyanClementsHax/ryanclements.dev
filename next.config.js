// I'd love to convert this to .mjs but storybook-addon-next doesn't support importing mjs yet
/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-expect-error: there are no typings for this module
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')

/**
 * @type {import('next').NextConfig}
 **/
const config = {}

module.exports = withPlugins(
  [
    // @ts-expect-error: the typings are wrong for thsi module
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true'
    })
  ],
  config
)
