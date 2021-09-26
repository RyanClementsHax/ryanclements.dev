// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-expect-error: there are no typings for this module
const withPlugins = require('next-compose-plugins')
const nextTranslate = require('next-translate')
// @ts-expect-error: there are no typings for this module
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const { getAuth0Config } = require('./lib/build/config')

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  target: 'serverless',
  sassOptions: {
    prependData: "@import 'styles/variables';"
  },
  experimental: { esmExternals: true },
  env: {
    ...getAuth0Config()
  }
}

module.exports = withPlugins([withBundleAnalyzer, nextTranslate], config)
