import React from 'react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/core';

const Link = ({ color, ...rest }: LinkProps) => {
  return <ChakraLink color="brand.500" {...rest} />;
};

export default Link;
