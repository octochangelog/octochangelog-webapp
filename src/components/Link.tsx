import { Link as ChakraLink, LinkProps } from '@chakra-ui/core';

const Link = (props: LinkProps) => {
  return <ChakraLink color="primary.500" {...props} />;
};

export default Link;
