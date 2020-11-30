import {
  Box,
  BoxProps,
  Code,
  Heading,
  Icon,
  HeadingProps,
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

import BlockQuote from '~/components/BlockQuote'
import Link from '~/components/Link'
import TextSkeleton from '~/components/TextSkeleton'

const remarkReactComponents = {
  h1: (props: HeadingProps) => <Heading as="h2" size="xl" mb="4" {...props} />,
  h2: (props: HeadingProps) => <Heading as="h3" size="lg" mb="4" {...props} />,
  h3: (props: HeadingProps) => <Heading as="h4" size="md" mb="4" {...props} />,
  h4: (props: HeadingProps) => <Heading as="h5" size="sm" mb="4" {...props} />,
  h5: (props: HeadingProps) => <Heading as="h6" size="xs" mb="2" {...props} />,
  h6: (props: HeadingProps) => <Heading as="h6" size="xs" mb="2" {...props} />,
  p: (props: BoxProps) => <Text mb="2" {...props} />,
  a: ({ href, children, ...rest }: LinkProps) => (
    <Link href={href} isExternal {...rest}>
      {children} <Icon as={FiExternalLink} mx="2px" />
    </Link>
  ),
  ul: (props: any) => (
    <List styleType="disc" mb="4" ml="4" stylePosition="outside" {...props} />
  ),
  ol: (props: any) => (
    <List
      as="ol"
      styleType="decimal"
      mb="4"
      ml="4"
      stylePosition="outside"
      {...props}
    />
  ),
  li: ListItem,
  pre: (props: BoxProps) => (
    <Code as="pre" display="block" mb="4" p="3" overflowX="auto" {...props} />
  ),
  code: (props: BoxProps) => <Code color="inherit" {...props} />,
  blockquote: (props: BoxProps) => <BlockQuote mb="2" {...props} />,
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
            <TagLabel>{processedReleaseChange.tag_name}</TagLabel>
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
