import { type Config } from 'jest'
import nextJest from 'next/jest'
import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

const createJestConfig = nextJest({
	dir: './',
})

const tsPathsToModules = pathsToModuleNameMapper(compilerOptions.paths, {
	prefix: '<rootDir>/',
})

const config: Config = {
	clearMocks: true,
	roots: ['<rootDir>/src/'],
	reporters: process.env.CI
		? [['github-actions', { silent: false }], 'summary']
		: undefined,
	setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
	moduleNameMapper: {
		...tsPathsToModules,
		'^lodash-es$': 'lodash', // so lodash-es is not compiled

		// Compatibility issues between MSW and Jest
		// https://mswjs.io/docs/migrations/1.x-to-2.x#requestresponsetextencoder-is-not-defined-jest
		setupFiles: ['./jest.polyfills.js'],

		// Avoid JSDOM changing msw imports from msw/node to msw/browser
		// https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom
		testEnvironmentOptions: {
			// @ts-expect-error This is probably not defined in Jest types.
			customExportConditions: [''],
		},
	},

	// Don't set "testEnvironment" to "jsdom" in here.
	// Instead, use the @jest-environment docblock https://jestjs.io/docs/configuration#testenvironment-string
}

export default createJestConfig(config)
