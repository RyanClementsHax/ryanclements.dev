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
    // Allow Sass imports like `@use 'utils'` from the styles directory
    includePaths: [path.join(process.cwd(), 'styles')]
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

// Compose Next.js plugins and export the final config object
export default [
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
  })
].reduce((acc, next) => next(acc), config)
