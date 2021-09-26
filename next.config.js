// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-expect-error: there are no typings for this module
const withPlugins = require('next-compose-plugins')
// @ts-expect-error: there are no typings for this module
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  target: 'serverless',
  experimental: { esmExternals: true },
}

module.exports = withPlugins([withBundleAnalyzer], config)
