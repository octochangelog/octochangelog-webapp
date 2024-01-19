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
	reporters: [['github-actions', { silent: false }], 'summary'],
	setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
	moduleNameMapper: {
		...tsPathsToModules,
		'^lodash-es$': 'lodash', // so lodash-es is not compiled
	},

	// Don't set "testEnvironment" to "jsdom" in here.
	// Instead, use the @jest-environment docblock https://jestjs.io/docs/configuration#testenvironment-string
}

export default createJestConfig(config)
