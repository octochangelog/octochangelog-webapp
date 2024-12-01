import { withSentryConfig } from '@sentry/nextjs'
import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
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
	// eslint-disable-next-line @typescript-eslint/require-await
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

export default withSentryConfig(nextConfig, {
	// For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	release: {
		deploy: {
			// If deployed to Vercel, it will be tagged as production or review.
			// Otherwise, we don't know what environment is being run on (e.g. local, cypress, CI).
			env: process.env.VERCEL_ENV || 'unknown',
		},
	},

	// Only print logs for uploading source maps in CI
	silent: !process.env.CI,

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: true,

	// Automatically annotate React components to show their full name in breadcrumbs and session replay
	reactComponentAnnotation: {
		enabled: true,
	},

	// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	tunnelRoute: '/monitoring',

	// Hides source maps from generated client bundles
	hideSourceMaps: true,

	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true,

	// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
	// See the following for more information:
	// https://docs.sentry.io/product/crons/
	// https://vercel.com/docs/cron-jobs
	automaticVercelMonitors: true,
})
