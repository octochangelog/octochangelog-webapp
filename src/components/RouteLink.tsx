import type { LinkProps } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

interface RouteLinkProps extends LinkProps {
  href: string
}

const RouteLink = ({ href, children, ...rest }: RouteLinkProps) => (
  <NextLink passHref href={href}>
    <Link {...rest}>{children}</Link>
  </NextLink>
)

export default RouteLink
