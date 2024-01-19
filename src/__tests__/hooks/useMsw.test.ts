/**
 * @jest-environment jsdom
 */
import { expect, test, jest, afterEach, beforeEach } from '@jest/globals'

import { useMsw } from '@/hooks/useMsw'
import { renderHook, waitFor } from '@/test-utils'

const mockInitMocks = jest.fn()
jest.mock('@/mock-service-worker', () => {
	return {
		initMocks: mockInitMocks,
	}
})

const OLD_ENV = process.env

beforeEach(() => {
	jest.resetModules()
	process.env = { ...OLD_ENV }
})

afterEach(() => {
	process.env = OLD_ENV
	delete window.msw
	delete window.isApiMockingReady
	delete window.isApiMockingEnabled
})

test('should init API mocking by default', async () => {
	const { result } = renderHook(() => useMsw())

	expect(mockInitMocks).not.toHaveBeenCalled()
	expect(result.current.isReady).toBe(false)
	expect(window.isApiMockingReady).toBeUndefined()
	expect(window.isApiMockingEnabled).toBe(true)

	await waitFor(() => expect(result.current.isReady).toBe(true))
	expect(mockInitMocks).toHaveBeenCalledTimes(1)
	expect(window.isApiMockingReady).toBe(true)
	expect(window.isApiMockingEnabled).toBe(true)
})

test('should init API mocking only once', async () => {
	const { result, rerender } = renderHook(() => useMsw())

	await waitFor(() => expect(result.current.isReady).toBe(true))
	expect(mockInitMocks).toHaveBeenCalledTimes(1)

	rerender()
	expect(mockInitMocks).toHaveBeenCalledTimes(1)
})

test('should not init API mocking if disabled', () => {
	// Make sure than the module is not even imported by throwing an error,
	// since we don't want to import it on production.
	jest.mock('@/mock-service-worker', () => {
		throw new Error('I should not be called!')
	})
	process.env.NEXT_PUBLIC_API_MOCKING = 'disabled'

	const { result } = renderHook(() => useMsw())

	expect(result.current.isReady).toBe(true)
	expect(mockInitMocks).not.toHaveBeenCalled()
	expect(window.isApiMockingReady).toBe(true)
	expect(window.isApiMockingEnabled).toBeUndefined()
})

test('should not init API mocking if running on Vercel', () => {
	// Make sure than the module is not even imported by throwing an error,
	// since we don't want to import it on production.
	jest.mock('@/mock-service-worker', () => {
		throw new Error('I should not be called!')
	})
	process.env.NEXT_PUBLIC_VERCEL_ENV = 'production'

	const { result } = renderHook(() => useMsw())

	expect(result.current.isReady).toBe(true)
	expect(mockInitMocks).not.toHaveBeenCalled()
	expect(window.isApiMockingReady).toBe(true)
	expect(window.isApiMockingEnabled).toBeUndefined()
})
