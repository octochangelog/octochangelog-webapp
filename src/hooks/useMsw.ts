import { useEffect, useState } from 'react'

function getIsApiMockingEnabled() {
	return (
		process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' &&
		!process.env.NEXT_PUBLIC_VERCEL_ENV
	)
}

function setIsApiMockingReady(): void {
	window.isApiMockingReady = true
}

async function prepare(): Promise<ServiceWorkerRegistration | undefined> {
	if (getIsApiMockingEnabled()) {
		const { initMocks } = await import('@/mock-service-worker')
		return initMocks()
	}

	return undefined
}

function initIsReadyState() {
	return !getIsApiMockingEnabled()
}

interface UseMswReturn {
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
function useMsw(): UseMswReturn {
	const [isReady, setIsReady] = useState<boolean>(initIsReadyState)

	useEffect(() => {
		if (!isReady) {
			if (typeof window !== 'undefined') {
				window.isApiMockingEnabled = getIsApiMockingEnabled()
			}

			void prepare().finally(() => {
				setIsReady(true)
				setIsApiMockingReady()
			})
		} else {
			setIsApiMockingReady()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { isReady }
}

export { useMsw }
