import { Link, LinkProps } from '@chakra-ui/core';
import NextLink from 'next/link';

const RouteLink = ({ href = '#', children, ...rest }: LinkProps) => (
  <NextLink href={href} passHref>
    <Link {...rest}>{children}</Link>
  </NextLink>
);

export default RouteLink;
