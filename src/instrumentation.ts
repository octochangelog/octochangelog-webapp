import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

function register() {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		// Sentry server config
		Sentry.init({
			dsn: SENTRY_DSN,

			// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
			tracesSampleRate: 1,

			// Setting this option to true will print useful information to the console while you're setting up Sentry.
			debug: false,
		})
	}

	if (process.env.NEXT_RUNTIME === 'edge') {
		// Sentry edge config
		Sentry.init({
			dsn: SENTRY_DSN,

			// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
			tracesSampleRate: 1,

			// Setting this option to true will print useful information to the console while you're setting up Sentry.
			debug: false,
		})
	}
}
const onRequestError = Sentry.captureRequestError

export { register, onRequestError }
