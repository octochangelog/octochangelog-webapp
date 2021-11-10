import { withSentryConfig } from '@sentry/nextjs'

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/comparator',
        has: [{ type: 'query', key: 'repo' }],
        permanent: true,
      },
    ]
  },
}

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

// wrap the bundle with Sentry only if built/deployed in Vercel
const activeConfig = process.env.VERCEL
  ? withSentryConfig(config, SentryWebpackPluginOptions)
  : config

export default activeConfig
