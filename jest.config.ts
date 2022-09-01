import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
	dir: './',
})

const config: Config = {
	clearMocks: true,
	rootDir: './src',
	reporters: ['default', 'github-actions'],
	coverageDirectory: '<rootDir>/../coverage',
	moduleDirectories: ['node_modules', '<rootDir>/'],
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/$1',
	},
}

export default createJestConfig(config)
