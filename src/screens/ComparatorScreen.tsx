import RepositoryReleasesComparator from '~/components/RepositoryReleasesComparator'

const ComparatorScreen = () => {
  // TODO: get this back when errors moved to comparator context
  //  or try to set global RQ onError
  // const [shouldShowExceeded, setShouldShowExceeded] = useState(false)
  // const toast = useToast()
  //
  // const handleQueryError = useCallback(
  //   (err: Error) => {
  //     if (err) {
  //       toast({
  //         title: 'An error occurred.',
  //         description: err.message || 'Something went wrong',
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //         position: 'bottom-left',
  //       })
  //
  //       // TODO: get this from octokit properly
  //       if (err.message === GITHUB_RATE_LIMIT_EXCEEDED_ERROR) {
  //         setShouldShowExceeded(true)
  //       }
  //     }
  //   },
  //   [toast]
  // )
  //
  // useEffect(
  //   function handleReleasesErrorEffect() {
  //     handleQueryError(releasesError as Error)
  //   },
  //   [handleQueryError, releasesError]
  // )
  //
  // if (shouldShowExceeded) {
  //   return <RateLimitExceededNotice />
  // }

  return <RepositoryReleasesComparator />
}

export default ComparatorScreen
