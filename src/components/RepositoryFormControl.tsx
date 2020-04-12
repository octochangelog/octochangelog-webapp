import React from 'react';
import {
  FormErrorMessage,
  FormControl,
  FormControlProps,
  FormLabel,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/core';
import { getRepositoryDataFromUrl } from 'utils';
import { GitHubRepositoryQueryVars } from 'types';

type CustomProps = {
  isLoading?: boolean;
  onChange(repoData: GitHubRepositoryQueryVars | null): void;
};

type PropTypes = Omit<FormControlProps, 'onChange'> & CustomProps;

const RepositoryFormControl: React.FC<PropTypes> = ({
  onChange,
  // TODO: add onClear callback
  isLoading = false,
  ...rest
}) => {
  const [repoUrl, setRepoUrl] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleGetRepositoryData = () => {
    const repoData = getRepositoryDataFromUrl(repoUrl);
    onChange(repoData);

    if (repoData) {
      setError('');
      // TODO: when onClear available, call onChange here
    } else {
      setError('Please fill valid GitHub repository url');
      // TODO: when onClear available, call it here
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setRepoUrl(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGetRepositoryData();
    }
  };

  return (
    <FormControl
      isRequired
      width="full"
      isDisabled={isLoading}
      isInvalid={!!error}
      {...rest}
    >
      <FormLabel htmlFor="repo-url">Repository url</FormLabel>
      <Stack isInline>
        <Input
          type="text"
          id="repo-url"
          placeholder="Paste the repo url and press enter or click search button"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          aria-label="Search database"
          variantColor="orange"
          icon="search"
          isLoading={isLoading}
          onClick={handleGetRepositoryData}
        />
      </Stack>
      <FormErrorMessage>
        Please fill valid GitHub repository url
      </FormErrorMessage>
    </FormControl>
  );
};

export default RepositoryFormControl;
