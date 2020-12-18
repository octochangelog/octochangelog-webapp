import {
  Box,
  BoxProps,
  Code,
  Heading,
  Icon,
  LinkProps,
  List,
  ListItem,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react'
import useProcessDescriptionMdast from 'hooks/useProcessDescriptionMdast'
import { ProcessedReleaseChange, Repository } from 'models'
import { FiExternalLink } from 'react-icons/fi'
import { GoTag } from 'react-icons/go'
import { ComponentProps } from 'rehype-react'

import BlockQuote from '~/components/BlockQuote'
import Link from '~/components/Link'
import TextSkeleton from '~/components/TextSkeleton'
import { getReleaseVersion } from '~/utils'

const remarkReactComponents = {
  h1: (props: ComponentProps) => (
    <Heading as="h2" size="xl" mb="4" {...props} />
  ),
  h2: (props: ComponentProps) => (
    <Heading as="h3" size="lg" mb="4" {...props} />
  ),
  h3: (props: ComponentProps) => (
    <Heading as="h4" size="md" mb="4" {...props} />
  ),
  h4: (props: ComponentProps) => (
    <Heading as="h5" size="sm" mb="4" {...props} />
  ),
  h5: (props: ComponentProps) => (
    <Heading as="h6" size="xs" mb="2" {...props} />
  ),
  h6: (props: ComponentProps) => (
    <Heading as="h6" size="xs" mb="2" {...props} />
  ),
  p: (props: ComponentProps) => <Text mb="2" {...props} />,
  a: ({ href, children, ...rest }: ComponentProps & LinkProps) => (
    <Link href={href} isExternal {...rest}>
      {children} <Icon as={FiExternalLink} mx="2px" />
    </Link>
  ),
  ul: (props: ComponentProps) => (
    <List styleType="disc" mb="4" ml="4" stylePosition="outside" {...props} />
  ),
  ol: (props: ComponentProps) => (
    <List
      as="ol"
      styleType="decimal"
      mb="4"
      ml="4"
      stylePosition="outside"
      {...props}
    />
  ),
  li: (props: ComponentProps) => <ListItem {...props} />,
  pre: (props: ComponentProps) => (
    <Code as="pre" display="block" mb="4" p="3" overflowX="auto" {...props} />
  ),
  code: (props: ComponentProps) => <Code color="inherit" {...props} />,
  blockquote: (props: ComponentProps) => <BlockQuote mb="2" {...props} />,
}

interface ProcessedReleaseChangeProps extends BoxProps {
  repository: Repository
  processedReleaseChange: ProcessedReleaseChange
}

const ProcessedReleaseChangeDescription = ({
  processedReleaseChange,
  repository,
  ...rest
}: ProcessedReleaseChangeProps) => {
  const { processedDescription, isProcessing } = useProcessDescriptionMdast({
    repository,
    description: processedReleaseChange.descriptionMdast,
    componentsMapping: remarkReactComponents,
  })

  return (
    <Box {...rest} mb={8}>
      {!isProcessing ? (
        <>
          <Tag size="md" mb={2} rounded="full" colorScheme="primary">
            <Box as={GoTag} h={4} w={4} mr={1} />
            <TagLabel>{getReleaseVersion(processedReleaseChange)}</TagLabel>
          </Tag>
          <Box ml={4}>{processedDescription}</Box>
        </>
      ) : (
        <TextSkeleton />
      )}
    </Box>
  )
}

export default ProcessedReleaseChangeDescription
