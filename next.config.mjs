import withBundleAnalyzer from '@next/bundle-analyzer'

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  eslint: {
    // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
    dirs: ['.']
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
