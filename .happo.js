const { RemoteBrowserTarget } = require('happo.io')

module.exports = {
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,
  targets: {
    'Chrome - Desktop': new RemoteBrowserTarget('chrome', {
      viewport: '1024x768',
    }),
    'Firefox - Desktop': new RemoteBrowserTarget('firefox', {
      viewport: '1024x768',
    }),
    'Chrome - Mobile': new RemoteBrowserTarget('chrome', {
      viewport: '320x640',
    }),
    'Safari - Mobile': new RemoteBrowserTarget('ios-safari'),
  },
}
