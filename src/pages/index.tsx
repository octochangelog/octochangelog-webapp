import { NextSeo } from 'next-seo'

import Layout from '~/components/Layout'
import RepositoryReleasesComparator from '~/components/RepositoryReleasesComparator'
import { ComparatorProvider } from '~/contexts/comparator-context'

const IndexPage = () => {
  return (
    <Layout>
      <NextSeo title="Comparator" />
      <ComparatorProvider>
        <RepositoryReleasesComparator />
      </ComparatorProvider>
    </Layout>
  )
}

export default IndexPage
