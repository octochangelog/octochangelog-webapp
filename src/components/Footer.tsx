import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/core/dist';
import Container from './Container';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.50" flexShrink={0}>
      <Container py={5}>
        <Flex justify="space-between">
          <Box>
            Created with{' '}
            <span role="img" aria-label="Love">
              🧡
            </span>{' '}
            by{' '}
            <Link href="https://mario.dev/" color="orange.500" isExternal>
              Mario
            </Link>
          </Box>
          <Box>
            <Link
              className="github-button"
              href="https://github.com/Belco90/github-compare-releases"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star Belco90/github-compare-releases on GitHub"
            >
              Star
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
