const Dotenv = require('dotenv-webpack');

module.exports = {
  env: {},
  webpack: (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(new Dotenv({ silent: true }));

    config.node = {
      fs: 'empty',
    };

    return config;
  },
};
