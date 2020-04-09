import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  Alert,
  AlertIcon,
  Spinner,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/core';

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const MainContent = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

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

  return (
    <Stack>
      {data.rates.map(
        ({ currency, rate }: { currency: string; rate: number }) => (
          <Stat key={currency}>
            <StatLabel>{currency}</StatLabel>
            <StatNumber>{rate}</StatNumber>
          </Stat>
        )
      )}
    </Stack>
  );
};

export default MainContent;
