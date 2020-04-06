import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

const Container = (props: BoxProps) => (
  <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />
);

export default Container;
