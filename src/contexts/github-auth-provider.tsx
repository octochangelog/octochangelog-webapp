import { createContext, useContext, useEffect, useState } from 'react'

import { getGithubAccessToken, setGithubAccessToken } from '~/github-client'

type GithubAuthContextValue = {
  setAccessToken: (newAccessToken?: string | null) => void
  isAuth: boolean
}

const GithubAuthContext = createContext<GithubAuthContextValue | null>(null)

const GithubAuthProvider = (props: any) => {
  const [accessToken, setAccessToken] = useState<string | null | undefined>(
    getGithubAccessToken
  )

  useEffect(() => {
    setGithubAccessToken(accessToken)
  }, [accessToken])

  const providerValue: GithubAuthContextValue = {
    setAccessToken,
    isAuth: Boolean(accessToken),
  }

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
