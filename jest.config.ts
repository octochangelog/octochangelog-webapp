import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
	dir: './',
})

const config: Config = {
	clearMocks: true,
	roots: ['<rootDir>/src/'],
	reporters: ['default', 'github-actions'],
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/src/$1',
		'^lodash-es$': 'lodash', // so lodash-es is not compiled
	},
}

export default createJestConfig(config)
