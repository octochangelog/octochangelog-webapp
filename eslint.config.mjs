import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import unicorn from 'eslint-plugin-unicorn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

const eslintConfig = [
	{
		ignores: [
			'**/node_modules',
			'coverage',
			'**/.next',
			'**/.now',
			'**/.env*',
			'**/lint-staged.config.js',
			'**/.percy.js',
		],
	},
	...compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
		'prettier',
	),
	{
		plugins: {
			unicorn,
		},

		settings: {
			'import/internal-regex': '^(@app-|~)',
		},

		rules: {
			'no-shadow': 'error',
			'no-warning-comments': 'off',
			'no-console': 'warn',

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

			'react/self-closing-comp': 'error',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-boolean-value': 'error',
			'react/no-unknown-property': 'off',
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
			'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
			'unicorn/no-for-loop': 'error',
			'unicorn/no-array-for-each': 'error',
			'unicorn/no-array-reduce': 'error',
		},
	},
	...compat
		.extends(
			'plugin:@typescript-eslint/recommended-type-checked',
			'plugin:@typescript-eslint/stylistic-type-checked',
		)
		.map((config) => ({
			...config,
			files: ['**/*.ts?(x)'],
		})),
	{
		files: ['**/*.ts?(x)'],
		languageOptions: {
			ecmaVersion: 5,
			sourceType: 'script',
			parserOptions: {
				tsconfigRootDir: __dirname,
				projectService: {
					allowDefaultProject: ['*.js'],
					defaultProject: './tsconfig.json',
				},
			},
		},

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

			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/unbound-method': 'off',
		},
	},
	{
		files: ['src/app/**/*.[jt]s?(x)'],
		rules: {
			'import/group-exports': 'off',
		},
	},
	...compat.extends('plugin:@vitest/legacy-recommended').map((config) => ({
		...config,

		files: [
			'src/**/__tests__/**/*.[jt]s?(x)',
			'src/**/?(*.)+(spec|test).[jt]s?(x)',
			'src/setup-tests.ts',
		],
	})),
	...compat.extends('plugin:cypress/recommended').map((config) => ({
		...config,
		files: ['cypress/**/*.[jt]s'],
	})),
]

export default eslintConfig
