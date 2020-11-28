import { isEqual } from 'lodash'
import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { octokit } from '~/github-client'
import { ReleaseVersion, Repository } from '~/models'
import { mapStringToRepositoryQueryParams } from '~/utils'

interface ValuesShape {
  repository?: Repository | null
  fromVersion?: ReleaseVersion | null
  toVersion?: ReleaseVersion | null
}

type ComparatorStateContextValue = {
  repository?: Repository
  fromVersion?: ReleaseVersion
  toVersion?: ReleaseVersion
}
type ComparatorUpdaterContextValue = {
  setRepository: (newRepository?: Repository) => void
  setFromVersion: (newVersion?: ReleaseVersion) => void
  setToVersion: (newVersion?: ReleaseVersion) => void
}

const ComparatorStateContext = createContext<
  ComparatorStateContextValue | undefined
>(undefined)
const ComparatorUpdaterContext = createContext<
  ComparatorUpdaterContextValue | undefined
>(undefined)

type InitStatus = 'mount' | 'loading' | 'done'

function ComparatorProvider({ children }: { children: ReactNode }) {
  // const [initStatus, setInitStatus] = useState<InitStatus>('mount')
  const statusRef = useRef<InitStatus>('mount')
  const initialValuesRef = useRef<ValuesShape>({})
  const [repository, setRepository] = useState<Repository | undefined>(
    undefined
  )
  const [fromVersion, setFromVersion] = useState<ReleaseVersion | undefined>(
    undefined
  )
  const [toVersion, setToVersion] = useState<ReleaseVersion | undefined>(
    undefined
  )
  const router = useRouter()

  useEffect(() => {
    const initComparator = async () => {
      // using window.location.search instead of router.query since the latter
      // is not available until rerender after mount
      const locationSearch = window.location.search.substring(1)

      if (locationSearch) {
        // setInitStatus('loading')
        statusRef.current = 'loading'
        const searchParams = new URLSearchParams(locationSearch)
        const repositoryQueryParams = mapStringToRepositoryQueryParams(
          searchParams.get('repo') ?? ''
        )

        initialValuesRef.current.fromVersion = searchParams.get('from')
        initialValuesRef.current.toVersion = searchParams.get('to')

        if (repositoryQueryParams) {
          const response = await octokit.repos.get(repositoryQueryParams)

          if (response?.data) {
            initialValuesRef.current.repository = response.data
            setRepository(response.data)
          }
        }

        if (initialValuesRef.current.fromVersion) {
          setFromVersion(initialValuesRef.current.fromVersion)
        }
        if (initialValuesRef.current.toVersion) {
          setToVersion(initialValuesRef.current.toVersion)
        }
      }

      // setInitStatus('done')
      statusRef.current = 'done'
    }

    initComparator()
  }, [])

  useEffect(() => {
    // if (initStatus === 'done') {
    if (statusRef.current === 'done') {
      // clean versions when repo changes
      setFromVersion(undefined)
      setToVersion(undefined)
    }
  }, [repository])

  useEffect(() => {
    // update qs filter values
    // if (initStatus !== 'done') {
    if (statusRef.current !== 'done') {
      return
    }
    const newQuery = Object.fromEntries(
      Object.entries({
        repo: repository?.full_name,
        from: fromVersion,
        to: toVersion,
      }).filter(([_, value]) => Boolean(value))
    )

    if (!isEqual(router.query, newQuery)) {
      router.replace(
        { pathname: router.pathname, query: newQuery },
        undefined,
        { shallow: true }
      )
    }
  }, [repository, fromVersion, toVersion, router])

  const stateValue = {
    repository,
    fromVersion,
    toVersion,
  }

  const updaterValue = {
    setRepository,
    setFromVersion,
    setToVersion,
  }

  return (
    <ComparatorStateContext.Provider value={stateValue}>
      <ComparatorUpdaterContext.Provider value={updaterValue}>
        {children}
      </ComparatorUpdaterContext.Provider>
    </ComparatorStateContext.Provider>
  )
}

function useComparatorState() {
  const context = useContext(ComparatorStateContext)

  if (context === undefined) {
    throw new Error(
      'useComparatorState must be used within a ComparatorProvider'
    )
  }

  return context
}

function useComparatorUpdater() {
  const context = useContext(ComparatorUpdaterContext)

  if (context === undefined) {
    throw new Error(
      'useComparatorUpdater must be used within a ComparatorProvider'
    )
  }

  return context
}

export { ComparatorProvider, useComparatorState, useComparatorUpdater }
