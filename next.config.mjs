import withBundleAnalyzer from '@next/bundle-analyzer'

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  experimental: {
    appDir: true
  },
  eslint: {
    // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
    dirs: ['.']
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
  [
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true'
    })
  ].reduce((acc, next) => next(acc), config)
