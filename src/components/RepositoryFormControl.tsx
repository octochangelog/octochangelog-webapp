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
import { RepositoryQueryVars } from 'models';

interface CustomProps {
  isLoading?: boolean;
  onSearch(repoData: RepositoryQueryVars | null): void;
}

type RepositoryFormControlProps = FormControlProps & CustomProps;

const RepositoryFormControl = ({
  onChange,
  onSearch,
  isLoading = false,
  ...rest
}: RepositoryFormControlProps) => {
  const [repoUrl, setRepoUrl] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const triggerSearch = (url: string) => {
    const repoData = getRepositoryDataFromUrl(url);
    onSearch(repoData);

    if (repoData) {
      setError('');
    } else if (repoUrl) {
      setError('Please fill valid GitHub repository url');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setRepoUrl(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      triggerSearch(repoUrl);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    setError('');

    const pastedText = event.clipboardData.getData('Text');
    setRepoUrl(pastedText);
    triggerSearch(pastedText);
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
          placeholder="Paste, press enter or click button to search"
          autoFocus
          value={repoUrl}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        <IconButton
          aria-label="Search repository"
          variantColor="orange"
          icon="search"
          isLoading={isLoading}
          onClick={() => triggerSearch(repoUrl)}
        />
      </Stack>
      <FormErrorMessage>
        Please fill valid GitHub repository url
      </FormErrorMessage>
    </FormControl>
  );
};

export default RepositoryFormControl;
