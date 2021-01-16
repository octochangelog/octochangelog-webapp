module.exports = {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
}
