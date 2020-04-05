import React from 'react';
import { Box, Heading } from '@chakra-ui/core';

const Header = () => {
  return (
    <Box as="header" px={5} py={5} bg="gray.700" color="white">
      <Heading textAlign="center">
        <span role="img" aria-label="Wool">
          🧶
        </span>{' '}
        GitHub Compare Releases
      </Heading>
    </Box>
  );
};

export default Header;
