/* eslint-disable @typescript-eslint/no-var-requires */
const jestVersion = require('jest/package.json').version

module.exports = {
	extends: [
		'eslint:recommended',
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
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
		'no-restricted-imports': [
			'error',
			{
				name: '@testing-library/react',
				message: 'Please import from `test-utils` instead.',
			},
			{
				name: 'next/router',
				message: 'Please import from `next/navigation` instead.',
			},
			{
				name: '@chakra-ui/next-js',
				importNames: ['Link'],
				message: 'Please import from `ChakraNextLink` instead.',
			},
		],

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
				pathGroups: [
					{
						pattern: '@/**',
						group: 'external',
						position: 'after',
					},
				],
			},
		],
		'import/group-exports': 'error',

		// TODO: Enable this one when gets released in `eslint-plugin-import`
		// 'import/consistent-type-specifier-style': ['error', 'prefer-inline'],

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
				'plugin:@typescript-eslint/recommended-type-checked',
				'plugin:@typescript-eslint/stylistic-type-checked',
			],
			rules: {
				'@typescript-eslint/array-type': [
					'warn',
					{
						default: 'generic',
					},
				],
				'@typescript-eslint/consistent-type-exports': [
					'error',
					{
						fixMixedExportsWithInlineTypeSpecifier: true,
					},
				],
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						fixStyle: 'inline-type-imports',
					},
				],

				// Disabling because of index errors on interfaces,
				// which works fine in type aliases:
				// https://bobbyhadz.com/blog/typescript-index-signature-for-type-is-missing-in-type
				'@typescript-eslint/consistent-type-definitions': 'off',

				// Disabling because it's too strict:
				// we are interested in using || operator multiple times to avoid empty strings.
				'@typescript-eslint/prefer-nullish-coalescing': 'off',

				'@typescript-eslint/unbound-method': 'off',
			},
		},
		// Next.js
		{
			files: ['src/app/**/*.[jt]s?(x)'],
			rules: {
				'import/group-exports': 'off',
			},
		},
		// Jest
		{
			files: [
				'src/**/__tests__/**/*.[jt]s?(x)',
				'src/**/?(*.)+(spec|test).[jt]s?(x)',
				'src/setup-tests.ts',
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
