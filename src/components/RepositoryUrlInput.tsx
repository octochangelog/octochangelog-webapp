import React from 'react';
import {
  FormControl,
  FormControlProps,
  FormLabel,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/core';
import { getRepositoryDataFromUrl } from 'utils';
import { GitHubRepositoryData } from 'types';

type CustomProps = {
  onRepositoryChange(repoData: GitHubRepositoryData | null): void;
};

type PropTypes = FormControlProps & CustomProps;

const RepositoryUrlInput: React.FC<PropTypes> = ({
  onRepositoryChange,
  ...rest
}) => {
  const [repoUrl, setRepoUrl] = React.useState<string>('');

  const handleGetRepositoryData = () => {
    const repoData = getRepositoryDataFromUrl(repoUrl);

    onRepositoryChange(repoData);
  };

  return (
    <FormControl isRequired {...rest}>
      <FormLabel htmlFor="repo-url">Repository url</FormLabel>
      <Stack isInline>
        <Input
          type="text"
          id="repo-url"
          placeholder="Start typing here..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRepoUrl(e.target.value)
          }
        />
        <IconButton
          aria-label="Search database"
          icon="search"
          onClick={handleGetRepositoryData}
        />
      </Stack>
    </FormControl>
  );
};

export default RepositoryUrlInput;
