module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  globals: {
    React: 'writable',
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['react-app', 'prettier/@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 0, // Next.js exposes React globally
    'react/self-closing-comp': 2,
    'import/order': [
      2,
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
  },
};
