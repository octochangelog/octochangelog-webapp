/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  rootDir: './src',
  coverageDirectory: '<rootDir>/../coverage',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['./setup-tests.ts'],
}

module.exports = createJestConfig(config)
