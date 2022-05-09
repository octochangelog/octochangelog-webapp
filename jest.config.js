/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  clearMocks: true,
  rootDir: './src',
  reporters: ['default', 'github-actions'],
  coverageDirectory: '<rootDir>/../coverage',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(config)
