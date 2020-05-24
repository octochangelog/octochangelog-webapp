import { Repository } from 'models';
import React from 'react';
import highlight from 'rehype-highlight';
import rehype2react from 'rehype-react';
import github from 'remark-github';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import markdown from 'remark-stringify';
import unified from 'unified';
import { Parent } from 'unist';

interface HookArgs {
  repository: Repository;
  description: Parent;
  componentsMapping: object;
}

interface HookReturnedValue {
  processedDescription: React.ReactNode;
  isProcessing: boolean;
}

async function processDescriptionAsync(
  description: Parent,
  repositoryUrl: string,
  components: object
): Promise<React.ReactNode> {
  return new Promise((resolve, reject) => {
    const processor = unified()
      .use(parse)
      .use(github, { repository: repositoryUrl })
      .use(remark2rehype)
      .use(highlight, { ignoreMissing: true })
      .use(rehype2react, {
        createElement: React.createElement,
        components,
      });

    processor.process(
      unified().use(markdown).stringify(description),
      (err, file: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(file.result);
        }
      }
    );
  });
}

function useProcessDescriptionMdast({
  repository,
  description,
  componentsMapping,
}: HookArgs): HookReturnedValue {
  const [
    processedDescription,
    setProcessedDescription,
  ] = React.useState<React.ReactNode | null>(null);

  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  React.useEffect(
    function processDescriptionMdastEffect() {
      setIsProcessing(true);
      const handleProcessDescription = async () => {
        const result = await processDescriptionAsync(
          description,
          repository.html_url,
          componentsMapping
        );

        setProcessedDescription(result);
        setIsProcessing(false);
      };
      handleProcessDescription();
    },
    [componentsMapping, description, repository.html_url]
  );

  const data = React.useMemo(
    () => ({
      processedDescription,
      isProcessing,
    }),
    [isProcessing, processedDescription]
  );

  return data;
}

export default useProcessDescriptionMdast;
