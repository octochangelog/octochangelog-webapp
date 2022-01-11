import type { Repository } from '../models'

import {
  mapRepositoryToQueryParams,
  mapStringToRepositoryQueryParams,
} from '~/utils'

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

describe('mapStringToRepositoryQueryParams util', () => {
  it('should return full repo details from splittable string', () => {
    const result = mapStringToRepositoryQueryParams('org/name')

    expect(result).toEqual({ owner: 'org', repo: 'name' })
  })

  it('should return partial repo details from non-splittable string', () => {
    const result = mapStringToRepositoryQueryParams('foo')

    expect(result).toEqual({ owner: 'foo', repo: '' })
  })

  it('should return empty details from empty string', () => {
    const result = mapStringToRepositoryQueryParams('')

    expect(result).toEqual({ owner: '', repo: '' })
  })
})
