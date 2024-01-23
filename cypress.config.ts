import { defineConfig } from 'cypress'
import happoTask from 'happo-cypress/task'

export default defineConfig({
	projectId: 'u8grd8',
	e2e: {
		/**
		 * `on` is used to hook into various events Cypress emits
		 * `config` is the resolved Cypress config
		 */
		setupNodeEvents(on) {
			happoTask.register(on)
		},
		baseUrl: 'http://127.0.0.1:3000',
		retries: {
			runMode: 1,
		},
	},
})
