import type { Repository } from '../models'

import { mapRepositoryToQueryParams } from '~/utils'

describe('mapRepositoryToQueryParams util', () => {
  it('should map an undefined repository', () => {
    const result = mapRepositoryToQueryParams()

    expect(result).toEqual({ owner: '', repo: '' })
  })

  it('should map a full repository', () => {
    const result = mapRepositoryToQueryParams({
      owner: { login: 'foo' },
      name: 'bar',
    } as Repository)

    expect(result).toEqual({ owner: 'foo', repo: 'bar' })
  })

  it('should map a partial repository', () => {
    const result = mapRepositoryToQueryParams({
      owner: {},
      name: 'bar',
    } as Repository)

    expect(result).toEqual({ owner: '', repo: 'bar' })
  })
})
