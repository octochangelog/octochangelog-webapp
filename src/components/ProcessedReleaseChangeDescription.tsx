import React from 'react';
import {
  Box,
  BoxProps,
  Code,
  Heading,
  HeadingProps,
  List,
  ListItem,
  Text,
} from '@chakra-ui/core/';
import { ProcessedReleaseChange, RepositoryInfo } from 'models';
import Link from 'components/Link';
import BlockQuote from 'components/BlockQuote';
import TextSkeleton from 'components/TextSkeleton';
import useProcessDescriptionMdast from 'hooks/useProcessDescriptionMdast';
import 'highlight.styles.github.min.css';

const remarkReactComponents = {
  h1: (props: HeadingProps) => <Heading as="h2" size="xl" mb="4" {...props} />,
  h2: (props: HeadingProps) => <Heading as="h3" size="lg" mb="4" {...props} />,
  h3: (props: HeadingProps) => <Heading as="h4" size="md" mb="4" {...props} />,
  h4: (props: HeadingProps) => <Heading as="h5" size="sm" mb="4" {...props} />,
  h5: (props: HeadingProps) => <Heading as="h6" size="xs" mb="2" {...props} />,
  h6: (props: HeadingProps) => <Heading as="h6" size="xs" mb="2" {...props} />,
  p: (props: BoxProps) => <Text mb="2" {...props} />,
  a: Link,
  ul: (props: any) => <List styleType="disc" mb="4" {...props} />,
  li: ListItem,
  pre: (props: BoxProps) => (
    <Code as="pre" display="block" mb="4" p="3" {...props} />
  ),
  code: (props: BoxProps) => <Code {...props} />,
  blockquote: (props: BoxProps) => <BlockQuote mb="2" {...props} />,
};

interface ProcessedReleaseChangeProps extends BoxProps {
  repository: RepositoryInfo;
  processedReleaseChange: ProcessedReleaseChange;
}

const ProcessedReleaseChangeDescription = ({
  processedReleaseChange,
  repository,
  ...rest
}: ProcessedReleaseChangeProps) => {
  const { processedDescription } = useProcessDescriptionMdast({
    repository,
    description: processedReleaseChange.descriptionMdast,
    componentsMapping: remarkReactComponents,
  });

  return (
    <Box {...rest}>
      {processedDescription ? processedDescription : <TextSkeleton />}
    </Box>
  );
};

export default ProcessedReleaseChangeDescription;
