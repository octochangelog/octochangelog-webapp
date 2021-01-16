import { Flex, CircularProgress } from '@chakra-ui/react'
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
  repository?: Repository
  fromVersion?: ReleaseVersion
  toVersion?: ReleaseVersion
}

interface ComparatorStateContextValue extends ValuesShape {
  initialValues: ValuesShape | null
}

interface ComparatorUpdaterContextValue {
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

const loadingElement = (
  <Flex align="center" justify="center" height="100%">
    <CircularProgress size="8" isIndeterminate color="primary.400" />
  </Flex>
)

function ComparatorProvider({ children }: { children: ReactNode }) {
  const statusRef = useRef<InitStatus>('mount')
  const initialValuesRef = useRef<ValuesShape>({})
  const [isReady, setIsReady] = useState<boolean>(false)
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
      const { repo, from, to } = router.query as {
        repo: string
        from: string
        to: string
      }

      if (repo || from || to) {
        statusRef.current = 'loading'
        const repositoryQueryParams = mapStringToRepositoryQueryParams(
          repo ?? ''
        )

        initialValuesRef.current.fromVersion = from
        initialValuesRef.current.toVersion = to

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

      statusRef.current = 'done'
      setIsReady(true)
    }

    console.log(statusRef.current, router.isReady)
    if (statusRef.current === 'mount' && router.isReady) {
      initComparator()
    }
  }, [router.isReady, router.query])

  useEffect(() => {
    // clean versions when repo changes
    if (statusRef.current !== 'done') {
      return
    }
    setFromVersion(undefined)
    setToVersion(undefined)
  }, [repository])

  useEffect(() => {
    // update qs filter values
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
    initialValues: initialValuesRef.current,
  }

  const updaterValue = {
    setRepository,
    setFromVersion,
    setToVersion,
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
