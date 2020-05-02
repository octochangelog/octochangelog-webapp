import React from 'react';

import GitHubLoginLink from '~/components/GitHubLoginLink';
import Layout from '~/components/Layout';

const IndexPage = () => (
  <Layout isHeaderFixed extraTitle="Home">
    <GitHubLoginLink />
  </Layout>
);

export default IndexPage;
