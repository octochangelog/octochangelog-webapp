import { Box, Flex } from '@chakra-ui/core';
import Container from 'components/Container';
import Link from 'components/Link';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.50" flexShrink={0}>
      <Container py={5}>
        <Flex justify="space-between" alignItems="center">
          <Box fontSize={{ base: 'md', md: 'lg' }}>
            Created with{' '}
            <span role="img" aria-label="Love">
              💜
            </span>{' '}
            by{' '}
            <Link href="https://mario.dev/" isExternal>
              Mario
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
