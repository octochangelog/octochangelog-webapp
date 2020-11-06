import { Alert, AlertIcon } from '@chakra-ui/core'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

import Layout from '~/components/Layout'

interface Props {
  accessToken?: string
  errorMessage?: string
}

const AuthCallbackPage = ({ accessToken, errorMessage }: Props) => {
  console.log('access token:', accessToken)

  // const router = useRouter()

  useEffect(() => {
    if (accessToken) {
      console.log('TODO: redirect')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout extraTitle="Authorizing on GitHub">
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let errorMessage = undefined
  let accessToken = undefined

  try {
    const { code } = context.query

    if (code) {
      const response = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID,
            client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
            code,
          }),
        }
      )

      if (response.ok) {
        const responseJson = await response.json()
        accessToken = responseJson.access_token
        // save token and redirect to app
        // api.saveAccessToken(responseJson.access_token, context)
        // context.res.writeHead(302, { Location: '/' })
        // context.res.end()
      } else {
        errorMessage = 'Something went wrong obtaining access token'
      }
    } else {
      errorMessage = 'Empty temporary code received back from GitHub'
    }
  } catch (e) {
    errorMessage = e.toString()
  }

  // if this code is executed, something went wrong in the auth process,
  // so we need to delete the access token
  // api.saveAccessToken(undefined, context)
  return { props: { errorMessage, accessToken } }
}

export default AuthCallbackPage
