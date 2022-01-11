import type { Release, Repository } from '../models'

import {
  filterReleasesByVersionRange,
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

describe('filterReleasesByVersionRange util', () => {
  const getFakeReleases = (): Array<Release> => {
    return [
      { tag_name: 'v2.9.23' },
      { tag_name: 'v2.9.15' },
      { tag_name: 'v2.9.7' },
      { tag_name: 'v2.2.0' },
      { tag_name: 'v2.1.0' },
      { tag_name: 'v2.0.0' },
      { tag_name: 'v1.1.2' },
      { tag_name: 'v1.1.1' },
      { tag_name: 'v1.1.0' },
      { tag_name: 'v1.0.0' },
    ] as Array<Release>
  }

  it('should filter by provided range excluding the "from" but including the "to"', () => {
    const result = filterReleasesByVersionRange({
      releases: getFakeReleases(),
      from: 'v2.0.0',
      to: 'v2.9.7',
    })

    expect(result).toEqual([
      { tag_name: 'v2.9.7' },
      { tag_name: 'v2.2.0' },
      { tag_name: 'v2.1.0' },
    ])
  })

  it('should filter until the latest available release', () => {
    const result = filterReleasesByVersionRange({
      releases: getFakeReleases(),
      from: 'v2.0.0',
      to: 'latest',
    })

    expect(result).toEqual([
      { tag_name: 'v2.9.23' },
      { tag_name: 'v2.9.15' },
      { tag_name: 'v2.9.7' },
      { tag_name: 'v2.2.0' },
      { tag_name: 'v2.1.0' },
    ])
  })

  it('should return an empty array if the range is the other way around', () => {
    const result = filterReleasesByVersionRange({
      releases: getFakeReleases(),
      from: 'v2.0.0',
      to: 'v1.0.0',
    })

    expect(result).toEqual([])
  })

  it('should return an empty array if the releases are out of the rage', () => {
    const result = filterReleasesByVersionRange({
      releases: getFakeReleases(),
      from: 'v2.99.0',
      to: 'v5.0.0',
    })

    expect(result).toEqual([])
  })

  it('should throw an error if a range version is invalid', () => {
    expect(() =>
      filterReleasesByVersionRange({
        releases: getFakeReleases(),
        from: '1',
        to: '2',
      })
    ).toThrow(TypeError('Invalid Version: 1'))
  })
})
