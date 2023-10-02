import { withSentryConfig } from '@sentry/nextjs'

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const config = {
	reactStrictMode: true,
	eslint: {
		// Disable ESLint during builds since there is a lint job in CI.
		ignoreDuringBuilds: true,
	},
	transpilePackages: ['lodash-es'],
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

/**
 *
 * @type {Partial<import('@sentry/nextjs').SentryWebpackPluginOptions>}
 */
const sentryWebpackPluginOptions = {
	// Additional config options for the Sentry Webpack plugin. Keep in mind that
	// the following options are set automatically, and overriding them is not
	// recommended:
	//   release, url, org, project, authToken, configFile, stripPrefix,
	//   urlPrefix, include, ignore

	silent: true, // Suppresses all logs
	deploy: {
		env: process.env.VERCEL_ENV,
	},
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Wrap the bundle with Sentry only if built/deployed in Vercel,
// so Sentry is not enabled in local env.
const activeConfig = process.env.VERCEL
	? withSentryConfig(config, sentryWebpackPluginOptions)
	: config

export default activeConfig
