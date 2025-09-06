import withBundleAnalyzer from '@next/bundle-analyzer'
import path from 'node:path'

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  eslint: {
    // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
    dirs: ['.']
  },
  sassOptions: {
    // Allow Sass imports like `@use 'styles/utils'` from project root
    includePaths: [process.cwd()]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.buymeacoffee.com'
      }
    ]
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
  [
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true'
    })
  ].reduce((acc, next) => next(acc), config)
