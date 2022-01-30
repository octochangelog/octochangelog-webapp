import { NextSeo } from 'next-seo'

import Layout from '~/components/Layout'
import RepositoryReleasesComparator from '~/components/RepositoryReleasesComparator'
import { ComparatorProvider } from '~/contexts/comparator-context'

const ComparatorPage = () => (
  <Layout pageBgColor="secondaryBg">
    <NextSeo title="Comparator" />
    <ComparatorProvider>
      <RepositoryReleasesComparator />
    </ComparatorProvider>
  </Layout>
)

export default ComparatorPage
