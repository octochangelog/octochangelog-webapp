import { defineConfig } from 'cypress'
import happoTask from 'happo-cypress/task'

export default defineConfig({
	projectId: 'u8grd8',
	videoUploadOnPasses: false,
	e2e: {
		/**
		 * `on` is used to hook into various events Cypress emits
		 * `config` is the resolved Cypress config
		 */
		setupNodeEvents(on) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
			happoTask.register(on)
		},
		baseUrl: '127.0.0.1',
		retries: {
			runMode: 1,
		},
	},
})
