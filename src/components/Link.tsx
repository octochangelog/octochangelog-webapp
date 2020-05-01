import { Link as ChakraLink, LinkProps } from '@chakra-ui/core';
import React from 'react';

const Link = ({ color, ...rest }: LinkProps) => {
  return <ChakraLink color="brand.500" {...rest} />;
};

export default Link;
