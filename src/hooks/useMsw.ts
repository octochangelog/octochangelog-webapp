import { useEffect, useState } from 'react'

import { initMocks } from '~/mock-service-worker'

const isApiMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'

if (typeof window !== 'undefined') {
	window.isApiMockingEnabled = isApiMockingEnabled
}

function setCypressAppReady(): void {
	window.isApiMockingReady = true
}

function prepare(): Promise<ServiceWorkerRegistration | undefined> {
	if (isApiMockingEnabled) {
		return initMocks()
	}

	return Promise.resolve(undefined)
}

function initIsReadyState() {
	return !isApiMockingEnabled
}

interface HookReturnValue {
	isReady: boolean
}

/**
 * Hook to register MSW using the deferred mounting alternative way.
 * Inspired by https://mswjs.io/docs/recipes/deferred-mounting
 *
 * This is necessary to make sure some early request
 * (like `getInitialRepository in comparator-context`) is mocked properly on time.
 *
 * This hook must be used within Next.js `_app.tsx`, so the app can wait until
 * MSW is ready to render the actual page component.
 *
 * This causes a small delay. However, this only happens on local development,
 * since MSW is disabled in review and production environments.
 */
function useMsw(): HookReturnValue {
	const [isReady, setIsReady] = useState<boolean>(initIsReadyState)

	useEffect(() => {
		if (!isReady) {
			prepare().finally(() => {
				setIsReady(true)
				setCypressAppReady()
			})
		} else {
			setCypressAppReady()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { isReady }
}

export { useMsw }
