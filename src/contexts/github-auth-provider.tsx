import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { getGithubAccessToken, setGithubAccessToken } from '~/github-client'

type GithubAuthContextValue = {
  setAccessToken: (newAccessToken?: string | null) => void
  isAuth: boolean
}

const GithubAuthContext = createContext<GithubAuthContextValue | null>(null)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GithubAuthProvider = (props: any) => {
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

  return <GithubAuthContext.Provider {...props} value={providerValue} />
}

function useGithubAuth() {
  const context = useContext(GithubAuthContext)

  if (!context) {
    throw new Error('useGithubAuth must be used within GithubAuthProvider')
  }

  return context
}

export { GithubAuthProvider, useGithubAuth }
