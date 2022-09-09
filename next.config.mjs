import { withSentryConfig } from '@sentry/nextjs'

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const config = {
	experimental: {
		browsersListForSwc: true,
		legacyBrowsers: false,
	},
	swcMinify: true,
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

export default withSentryConfig(config, {
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
})
