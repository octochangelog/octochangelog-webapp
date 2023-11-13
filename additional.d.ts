/**
 * @file Declare here any additional module with no types or global types.
 */

import { type http } from 'msw'
import { type SetupWorker } from 'msw/browser'

declare module 'happo-cypress/task' {
	interface HappoTask {
		register: (on: Cypress.PluginEvents) => void
	}

	const happoTask: HappoTask
	export default happoTask
}

declare global {
	interface Window {
		// msw utils passed through window to be reused in E2E or other parts.
		msw?: {
			worker: SetupWorker
			http: typeof http
		}
		isApiMockingEnabled?: boolean
		isApiMockingReady?: boolean
	}
}
