module.exports = {
  async redirects() {
    return [
      {
        source: '/comparator',
        destination: '/',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    };

    return config;
  },
};
