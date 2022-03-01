import type { Repository } from '../../models'

import { useReleasesQuery } from '~/queries/release'
import { renderHook } from '~/react-hooks-test-utils'

const fakeRepository = {
  owner: { login: 'octoclairvoyant' },
  name: 'octoclairvoyant-webapp',
} as Repository

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
})

test('should not fetch if repository is empty', async () => {
  const { result, waitFor } = renderHook(() =>
    useReleasesQuery({ repository: undefined })
  )

  await waitFor(() => !result.current.isFetching)

  expect(result.current.data).toBeUndefined()
})

test('should fetch 10 release pages by default', async () => {
  const { result, waitFor } = renderHook(() =>
    useReleasesQuery({ repository: fakeRepository })
  )

  await waitFor(() => result.current.isSuccess)

  expect(result.current.data).toHaveLength(1000)
})
