const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: '/comparator',
        destination: '/',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    }

    return config
  },
})
