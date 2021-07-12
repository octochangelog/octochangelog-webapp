/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { withSentryConfig } = require('@sentry/nextjs')

const config = withBundleAnalyzer({
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

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: !process.env.VERCEL_ENV, // Suppresses all logs if not building the app at Vercel
  deploy: {
    env: process.env.VERCEL_ENV,
  },
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

if (process.env.VERCEL) {
  // wrap the bundle with Sentry only if built/deployed in Vercel
  module.exports = withSentryConfig(config, SentryWebpackPluginOptions)
} else {
  module.exports = config
}
