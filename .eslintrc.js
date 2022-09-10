/* eslint-disable @typescript-eslint/no-var-requires */
const jestVersion = require('jest/package.json').version

module.exports = {
	extends: [
		'eslint:recommended',
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	plugins: ['unicorn'],
	settings: {
		'import/internal-regex': '^(@app-|~)',
		jest: {
			version: jestVersion,
		},
	},
	rules: {
		// Base
		'no-shadow': 'error',
		'no-warning-comments': 'off',
		'no-console': 'warn', // doesn't seem to be enabled in any preset

		// React
		'react/self-closing-comp': 'error',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-boolean-value': 'error',
		'react/no-unknown-property': 'off', // started to report many weird errors recently

		// Import
		'import/newline-after-import': 'error',
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: false,
				},
			},
		],

		// Unicorn
		'unicorn/no-for-loop': 'error',
		'unicorn/no-array-for-each': 'error',
		'unicorn/no-array-reduce': 'error',
	},

	overrides: [
		// TypeScript
		{
			files: ['**/*.ts?(x)'],
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ['./tsconfig.eslint.json'],
			},

			/*
			 * Linting with Type Information only for TS files:
			 * https://typescript-eslint.io/docs/linting/typed-linting/#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided
			 */
			extends: [
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:@typescript-eslint/strict',
			],
			rules: {
				'@typescript-eslint/array-type': [
					'warn',
					{
						default: 'generic',
					},
				],
				'@typescript-eslint/consistent-type-exports': 'error',
				'@typescript-eslint/consistent-type-imports': 'error',

				// Disabling because of index errors on interfaces,
				// which works fine in type aliases:
				// https://bobbyhadz.com/blog/typescript-index-signature-for-type-is-missing-in-type
				'@typescript-eslint/consistent-type-definitions': 'off',

				// Disabling because it's too strict:
				// we are interested in using || operator multiple times to avoid empty strings.
				'@typescript-eslint/prefer-nullish-coalescing': 'off',
			},
		},
		// Jest
		{
			files: [
				'src/**/__tests__/**/*.[jt]s?(x)',
				'src/**/?(*.)+(spec|test).[jt]s?(x)',
			],
			extends: [
				'plugin:jest/recommended',
				'plugin:jest/style',
				'plugin:jest-formatting/recommended',
			],
			rules: {
				'jest/consistent-test-it': 'warn',
			},
		},
		// Cypress
		{
			files: ['cypress/**/*.[jt]s'],
			extends: ['plugin:cypress/recommended'],
			rules: {
				'jest/no-focused-tests': 'error',
			},
		},
	],
}
