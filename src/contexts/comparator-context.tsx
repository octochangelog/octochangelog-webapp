import { ParsedUrlQuery } from 'querystring'

import { Flex, CircularProgress } from '@chakra-ui/react'
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

interface ComparatorStateContextValue {
  repository?: Repository | null
  fromVersion?: ReleaseVersion | null
  toVersion?: ReleaseVersion | null
}

interface ComparatorUpdaterContextValue {
  setRepository: (newRepository?: Repository | null) => void
  setFromVersion: (newVersion?: ReleaseVersion | null) => void
  setToVersion: (newVersion?: ReleaseVersion | null) => void
}

interface FiltersQuerystring {
  repo?: string | null
  from?: string | null
  to?: string | null
}

const ComparatorStateContext = createContext<
  ComparatorStateContextValue | undefined
>(undefined)
const ComparatorUpdaterContext = createContext<
  ComparatorUpdaterContextValue | undefined
>(undefined)

type InitStatus = 'mount' | 'loading' | 'done'

const loadingElement = (
  <Flex align="center" justify="center" height="100%">
    <CircularProgress size="8" isIndeterminate color="primary.400" />
  </Flex>
)

function ComparatorProvider({ children }: { children: ReactNode }) {
  const statusRef = useRef<InitStatus>('mount')
  const [isReady, setIsReady] = useState<boolean>(false)
  const [repository, setRepository] = useState<Repository | null>(null)
  const router = useRouter()
  const { repo, from, to } = router.query as FiltersQuerystring

  const setQuerystringParams = (newFilters: FiltersQuerystring) => {
    const mergedFilters: FiltersQuerystring = {
      ...router.query,
      ...newFilters,
    }
    const newQuery: ParsedUrlQuery = Object.fromEntries(
      Object.entries(mergedFilters).filter(([_, value]) => Boolean(value))
    )

    router.replace({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    })
  }

  const setSelectedRepository = (newRepository?: Repository | null) => {
    setRepository(newRepository ?? null)
    setQuerystringParams({
      repo: newRepository?.full_name,
      from: null, // Clear from and to when changing repo
      to: null,
    })
  }

  const setSelectedFromVersion = (newFrom?: string | null) => {
    setQuerystringParams({ from: newFrom })
  }

  const setSelectedToVersion = (newTo?: string | null) => {
    setQuerystringParams({ to: newTo })
  }

  useEffect(() => {
    const getInitialRepository = async () => {
      if (repo) {
        statusRef.current = 'loading'

        const repositoryQueryParams = mapStringToRepositoryQueryParams(
          repo ?? ''
        )

        if (repositoryQueryParams) {
          const response = await octokit.repos.get(repositoryQueryParams)

          if (response?.data) {
            setRepository(response.data)
          }
        }
      }

      statusRef.current = 'done'
      setIsReady(true)
    }

    if (statusRef.current === 'mount' && router.isReady) {
      getInitialRepository()
    }
  }, [repo, router.isReady, router.query])

  const stateValue: ComparatorStateContextValue = {
    repository,
    fromVersion: from,
    toVersion: to,
  }

  const updaterValue: ComparatorUpdaterContextValue = {
    setRepository: setSelectedRepository,
    setFromVersion: setSelectedFromVersion,
    setToVersion: setSelectedToVersion,
  }

  return (
    <ComparatorStateContext.Provider value={stateValue}>
      <ComparatorUpdaterContext.Provider value={updaterValue}>
        {isReady ? children : loadingElement}
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
