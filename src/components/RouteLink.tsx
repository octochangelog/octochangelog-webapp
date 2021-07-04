import { Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'

const RouteLink = ({ href = '#', children, ...rest }: LinkProps) => (
  <NextLink passHref href={href}>
    <Link {...rest}>{children}</Link>
  </NextLink>
)

export default RouteLink
