import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { getGithubAccessToken, setGithubAccessToken } from '~/github-client'

type GithubAuthContextValue = {
  setAccessToken: (newAccessToken?: string | null) => void
  isAuth: boolean
}

const GithubAuthContext = createContext<GithubAuthContextValue | null>(null)

interface GithubAuthProviderProps {
  children: ReactNode
}

const GithubAuthProvider = ({ children }: GithubAuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null | undefined>(
    getGithubAccessToken
  )

  useEffect(() => {
    setGithubAccessToken(accessToken)
  }, [accessToken])

  const providerValue: GithubAuthContextValue = useMemo(
    () => ({
      setAccessToken,
      isAuth: Boolean(accessToken),
    }),
    [accessToken]
  )

  return (
    <GithubAuthContext.Provider value={providerValue}>
      {children}
    </GithubAuthContext.Provider>
  )
}

function useGithubAuth() {
  const context = useContext(GithubAuthContext)

  if (!context) {
    throw new Error('useGithubAuth must be used within GithubAuthProvider')
  }

  return context
}

export { GithubAuthProvider, useGithubAuth }
