import { Box, BoxProps } from '@chakra-ui/core';

import { containerSpace } from '~/customTheme';

const Container = (props: BoxProps) => (
  <Box
    width="full"
    maxWidth="1280px"
    mx="auto"
    px={containerSpace}
    {...props}
  />
);

export default Container;
