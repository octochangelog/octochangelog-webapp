import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		clearMocks: true,
		environment: 'jsdom',
		setupFiles: ['src/vitest.setup.ts'],
		// TODO: make sure lodash-es is not compiled
	},
})
