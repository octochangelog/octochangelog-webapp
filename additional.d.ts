/**
 * @file Declare here any additional module with no types or global types.
 */

import { type SetupWorker, type rest } from 'msw'

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
			rest: typeof rest
		}
		isApiMockingEnabled?: boolean
		isApiMockingReady?: boolean
	}
}
