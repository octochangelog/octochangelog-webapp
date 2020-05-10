const Dotenv = require('dotenv-webpack');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([optimizedImages], {
  env: {
    GITHUB_APP_CLIENT_ID: process.env.GITHUB_APP_CLIENT_ID,
    GITHUB_APP_CLIENT_SECRET: process.env.GITHUB_APP_CLIENT_SECRET,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  webpack: (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(new Dotenv({ silent: true }));

    config.node = {
      fs: 'empty',
    };

    return config;
  },
  experimental: {
    reactRefresh: true,
  },
});
