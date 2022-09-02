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
	preset: 'ts-jest',
	clearMocks: true,
	roots: ['<rootDir>/src/'],
	reporters: ['default', 'github-actions'],
	moduleNameMapper: {
		...tsPathsToModules,
		'^lodash-es$': 'lodash', // so lodash-es is not compiled
	},
}

export default createJestConfig(config)
