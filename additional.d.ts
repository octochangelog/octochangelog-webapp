/**
 * @file Declare here any additional module with no types or global types.
 */

declare module 'happo-cypress/task' {
	interface HappoTask {
		register: (on: Cypress.PluginEvents) => void
	}

	const happoTask: HappoTask
	export default happoTask
}
