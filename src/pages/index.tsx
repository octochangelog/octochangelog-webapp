import Layout from '~/components/Layout'
import RepositoryReleasesComparator from '~/components/RepositoryReleasesComparator'
import SEO from '~/components/SEO'
import { ComparatorProvider } from '~/contexts/comparator-context'

const IndexPage = () => {
  return (
    <Layout>
      <SEO />
      <ComparatorProvider>
        <RepositoryReleasesComparator />
      </ComparatorProvider>
    </Layout>
  )
}

export default IndexPage
