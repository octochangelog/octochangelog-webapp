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

	sentry: {
		// Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
		// for client-side builds. (This will be the default starting in
		// `@sentry/nextjs` version 8.0.0.) See
		// https://webpack.js.org/configuration/devtool/ and
		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
		// for more information.
		hideSourceMaps: true,
	},
}

export default withSentryConfig(config, {
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
})
