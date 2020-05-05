import { Box, BoxProps } from '@chakra-ui/core';

const Container = (props: BoxProps) => (
  <Box
    width="full"
    maxWidth="1280px"
    mx="auto"
    px={{ base: 2, md: 6 }}
    {...props}
  />
);

export default Container;
