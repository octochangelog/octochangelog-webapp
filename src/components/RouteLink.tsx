import { LinkProps } from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';

import Link from '~/components/Link';

const RouteLink = ({ href = '#', children, ...rest }: LinkProps) => (
  <NextLink href={href}>
    <Link href={href} {...rest}>
      {children}
    </Link>
  </NextLink>
);

export default RouteLink;
