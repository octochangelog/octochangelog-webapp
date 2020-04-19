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
import unified from 'unified';
import parse from 'remark-parse';
import github from 'remark-github';
import remark2rehype from 'remark-rehype';
import highlight from 'rehype-highlight';
import rehype2react from 'rehype-react';
import markdown from 'remark-stringify';

const remarkReactComponents = {
  a: Link,
  ul: (props: any) => <List styleType="disc" mb="4" {...props} />,
  li: ListItem,
  h1: (props: HeadingProps) => <Heading as="h2" size="xl" mb="4" {...props} />,
  h2: (props: HeadingProps) => <Heading as="h3" size="lg" mb="4" {...props} />,
  h3: (props: HeadingProps) => <Heading as="h4" size="md" mb="4" {...props} />,
  h4: (props: HeadingProps) => <Heading as="h5" size="sm" mb="4" {...props} />,
  h5: (props: HeadingProps) => <Heading as="h6" size="xs" mb="2" {...props} />,
  h6: (props: HeadingProps) => <Heading as="h6" size="xs" mb="2" {...props} />,
  // FIXME: pre?
  code: (props: BoxProps) => <Code px="2" {...props} />,
  p: (props: BoxProps) => <Text mb="4" {...props} />,
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
  const processor = unified()
    .use(parse)
    .use(github, { repository: repository.url })
    .use(remark2rehype)
    .use(highlight)
    .use(rehype2react, {
      createElement: React.createElement,
      components: remarkReactComponents,
    });

  return (
    <Box {...rest}>
      {
        processor.processSync(
          unified()
            .use(markdown)
            .stringify(processedReleaseChange.descriptionMdast)
          // @ts-ignore
        ).result
      }
    </Box>
  );
};

export default ProcessedReleaseChangeDescription;
