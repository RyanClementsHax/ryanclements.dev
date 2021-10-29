// @ts-check
import withPlugins from 'next-compose-plugins'
import withBundleAnalyzer from '@next/bundle-analyzer'

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  experimental: { esmExternals: true }
}

export default withPlugins(
  [
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true'
    })
  ],
  config
)
