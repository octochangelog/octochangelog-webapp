import { createContext, ReactNode, useContext, useState } from 'react'

import { Repository } from '~/models'

type ComparatorStateContextValue = {
  repository?: Repository
}
type ComparatorUpdaterContextValue = {
  setRepository: (newRepository: Repository) => void
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

  const stateValue = {
    repository,
  }

  const updaterValue = {
    setRepository,
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
