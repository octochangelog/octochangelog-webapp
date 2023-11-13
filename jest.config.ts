import type { Config } from 'jest'
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
	},
	setupFiles: ['./jest.polyfills.js'],

	// Avoid JSDOM changing msw imports from msw/node to msw/browser
	testEnvironmentOptions: {
		customExportConditions: [''],
	},

	// Don't set "testEnvironment" to "jsdom" in here.
	// Instead, use the @jest-environment docblock https://jestjs.io/docs/configuration#testenvironment-string
}

export default createJestConfig(config)
