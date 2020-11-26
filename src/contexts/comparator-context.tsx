import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ReleaseVersion, Repository } from '~/models'

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

function ComparatorProvider({ children }: { children: ReactNode }) {
  const [repository, setRepository] = useState<Repository | undefined>(
    undefined
  )
  const [fromVersion, setFromVersion] = useState<ReleaseVersion | undefined>(
    undefined
  )
  const [toVersion, setToVersion] = useState<ReleaseVersion | undefined>(
    undefined
  )

  useEffect(() => {
    // clean versions when repo changes
    setFromVersion(undefined)
    setToVersion(undefined)
  }, [repository])

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
