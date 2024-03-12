import { withSentryConfig } from '@sentry/nextjs'

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		// Disable ESLint during builds since there is a lint job in CI.
		ignoreDuringBuilds: true,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	transpilePackages: ['lodash-es'],
	async redirects() {
		return [
			{
				source: '/comparator',
				destination: '/compare',
				permanent: true,
			},
			{
				// Old redirect from root to /compare. Should be removed when params are moved to dynamic route.
				source: '/',
				destination: '/compare',
				has: [{ type: 'query', key: 'repo' }],
				permanent: true,
			},
		]
	},
}

export default withSentryConfig(
	nextConfig,
	{
		// For all available options, see:
		// https://github.com/getsentry/sentry-webpack-plugin#options

		// Suppresses source map uploading logs during build
		silent: true,

		deploy: {
			// If deployed to Vercel, it will be tagged as production or review.
			// Otherwise, we don't know what environment is being run on (e.g. local, cypress, CI).
			env: process.env.VERCEL_ENV || 'unknown',
		},
	},
	{
		// For all available options, see:
		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

		// Upload a larger set of source maps for prettier stack traces (increases build time)
		widenClientFileUpload: true,

		// Transpiles SDK to be compatible with IE11 (increases bundle size)
		transpileClientSDK: false,

		// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
		tunnelRoute: '/monitoring',

		// Hides source maps from generated client bundles
		hideSourceMaps: true,

		// Automatically tree-shake Sentry logger statements to reduce bundle size
		disableLogger: true,

		// Enables automatic instrumentation of Vercel Cron Monitors.
		// See the following for more information:
		// https://docs.sentry.io/product/crons/
		// https://vercel.com/docs/cron-jobs
		automaticVercelMonitors: true,
	},
)
