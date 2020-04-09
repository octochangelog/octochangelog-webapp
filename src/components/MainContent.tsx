import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Alert, AlertIcon, Code, Spinner } from '@chakra-ui/core';

const QUERY = gql`
  query {
    viewer {
      login
    }
  }
`;

const MainContent = () => {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    );
  }

  return <Code>{JSON.stringify(data, null, 2)}</Code>;
};

export default MainContent;
