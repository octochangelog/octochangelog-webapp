import { GetServerSideProps } from 'next';

const ComparatorRedirect = () => 'Redirecting...';

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.writeHead(301, { Location: '/' });
  context.res.end();

  return { props: {} };
};

export default ComparatorRedirect;
