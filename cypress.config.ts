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
			happoTask.register(on)
		},
		baseUrl: 'http://localhost:3000',
		retries: {
			runMode: 1,
		},
	},
})
