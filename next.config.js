module.exports = {
  async redirects() {
    return [
      {
        source: '/comparator',
        destination: '/',
        permanent: true,
      },
    ]
  },
  experimental: {
    optimizeFonts: true,
  },
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    }

    return config
  },
}
