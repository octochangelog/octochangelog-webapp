const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: '/comparator',
        destination: '/',
        permanent: true,
      },
    ]
  },
})
