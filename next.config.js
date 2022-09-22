// I'd love to convert this to .mjs but storybook-addon-next doesn't support importing mjs yet
/* eslint-disable @typescript-eslint/no-var-requires */

const withBundleAnalyzer = require('@next/bundle-analyzer')

/**
 * @type {import('next').NextConfig}
 **/
const config = {}

module.exports = () =>
  [
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true'
    })
  ].reduce((acc, next) => next(acc), config)
