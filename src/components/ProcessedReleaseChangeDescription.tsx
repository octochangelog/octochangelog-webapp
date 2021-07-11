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
import { FiExternalLink } from 'react-icons/fi'
import { ComponentProps } from 'rehype-react'

import BlockQuote from '~/components/BlockQuote'
import Link from '~/components/Link'
import TextSkeleton from '~/components/TextSkeleton'
import useProcessDescriptionMdast from '~/hooks/useProcessDescriptionMdast'
import { ProcessedReleaseChange, Repository } from '~/models'
import { getReleaseVersion } from '~/utils'

const RemarkH1 = (props: ComponentProps) => (
  <Heading as="h2" size="xl" mb="4" {...props} />
)

const RemarkH2 = (props: ComponentProps) => (
  <Heading as="h3" size="lg" mb="4" {...props} />
)

const RemarkH3 = (props: ComponentProps) => (
  <Heading as="h4" size="md" mb="4" {...props} />
)

const RemarkH4 = (props: ComponentProps) => (
  <Heading as="h5" size="sm" mb="4" {...props} />
)

const RemarkH5 = (props: ComponentProps) => (
  <Heading as="h6" size="xs" mb="2" {...props} />
)
const RemarkH6 = (props: ComponentProps) => (
  <Heading as="h6" size="xs" mb="2" {...props} />
)

const RemarkP = (props: ComponentProps) => <Text mb="2" {...props} />

const RemarkA = ({ href, children, ...rest }: ComponentProps & LinkProps) => (
  <Link isExternal href={href} {...rest}>
    {children} <Icon as={FiExternalLink} mx="2px" />
  </Link>
)

const RemarkUl = (props: ComponentProps) => (
  <List styleType="disc" mb="4" ml="4" stylePosition="outside" {...props} />
)

const RemarkOl = (props: ComponentProps) => (
  <List
    as="ol"
    styleType="decimal"
    mb="4"
    ml="4"
    stylePosition="outside"
    {...props}
  />
)

const RemarkLi = (props: ComponentProps) => <ListItem {...props} />

const RemarkPre = (props: ComponentProps) => (
  <Code as="pre" display="block" mb="4" p="3" overflowX="auto" {...props} />
)

const RemarkCode = (props: ComponentProps) => (
  <Code color="inherit" {...props} />
)

const RemarkBlockquote = (props: ComponentProps) => (
  <BlockQuote mb="2" {...props} />
)

const remarkReactComponents = {
  h1: RemarkH1,
  h2: RemarkH2,
  h3: RemarkH3,
  h4: RemarkH4,
  h5: RemarkH5,
  h6: RemarkH6,
  p: RemarkP,
  a: RemarkA,
  ul: RemarkUl,
  ol: RemarkOl,
  li: RemarkLi,
  pre: RemarkPre,
  code: RemarkCode,
  blockquote: RemarkBlockquote,
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
      {isProcessing ? (
        <TextSkeleton />
      ) : (
        <>
          <Link isExternal href={processedReleaseChange.html_url}>
            <Tag
              color="gray.900"
              size="md"
              mb={2}
              rounded="full"
              bgColor="gray.100"
              _hover={{ bgColor: 'gray.300' }}
              _active={{ bgColor: 'gray.400', color: 'gray.900' }}
            >
              <TagLabel>{getReleaseVersion(processedReleaseChange)}</TagLabel>
            </Tag>
          </Link>
          <Box ml={4}>{processedDescription}</Box>
        </>
      )}
    </Box>
  )
}

export default ProcessedReleaseChangeDescription
