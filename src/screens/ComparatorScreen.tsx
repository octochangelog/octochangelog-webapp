import { isEqual } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import RepositoryReleasesComparator from '~/components/RepositoryReleasesComparator'
import { useComparatorState } from '~/contexts/comparator-context'
import { mapRepositoryToString } from '~/utils'

const ComparatorScreen = () => {
  const router = useRouter()
  const { repository, fromVersion, toVersion } = useComparatorState()

  useEffect(() => {
    let newQuery = {}

    if (repository && fromVersion && toVersion) {
      newQuery = {
        repo: mapRepositoryToString(repository),
        from: fromVersion,
        to: toVersion,
      }
    }

    if (!isEqual(router.query, newQuery)) {
      router.replace(
        { pathname: router.pathname, query: newQuery },
        undefined,
        { shallow: true }
      )
    }
  }, [repository, fromVersion, toVersion, router])

  return <RepositoryReleasesComparator />
}

export default ComparatorScreen
