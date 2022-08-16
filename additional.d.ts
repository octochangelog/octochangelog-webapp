// declare here any additional module with no types

declare module 'happo-cypress/task' {
	interface HappoTask {
		register: (on: Cypress.PluginEvents) => void
	}

	const happoTask: HappoTask
	export default happoTask
}
