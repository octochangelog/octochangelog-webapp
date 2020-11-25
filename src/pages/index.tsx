import Layout from '~/components/Layout'
import { ComparatorProvider } from '~/contexts/comparator-context'
import ComparatorScreen from '~/screens/ComparatorScreen'

const IndexPage = () => {
  return (
    <Layout>
      <ComparatorProvider>
        <ComparatorScreen />
      </ComparatorProvider>
    </Layout>
  )
}

export default IndexPage
