import type { Release, Repository } from '../models'

import {
  getReleaseVersion,
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

describe('getReleaseVersion util', () => {
  it('should return the release name for a "latest" release', () => {
    const result = getReleaseVersion({
      tag_name: 'latest',
      name: 'v5.2.0',
    } as Release)

    expect(result).toBe('v5.2.0')
  })

  it('should return the tag name as fallback for a "latest" release', () => {
    const result = getReleaseVersion({
      tag_name: 'latest',
      name: '',
    } as Release)

    expect(result).toBe('latest')
  })

  it('should return the tag name for a "non-latest" release', () => {
    const result = getReleaseVersion({
      tag_name: 'v1.2.3',
      name: 'ignore-me',
    } as Release)

    expect(result).toBe('v1.2.3')
  })
})
