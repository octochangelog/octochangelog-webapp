import {
  FormErrorMessage,
  FormControl,
  FormControlProps,
  FormLabel,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/core';
import { RepositoryQueryPayload } from 'models';
import * as React from 'react';
import { getRepositoryDataFromUrl } from 'utils';

interface CustomProps {
  isLoading?: boolean;
  onSearch(repoData: RepositoryQueryPayload | null): void;
}

type RepositoryFormControlProps = FormControlProps & CustomProps;

const RepositoryFormControl = ({
  onChange,
  onSearch,
  isLoading = false,
  ...rest
}: RepositoryFormControlProps) => {
  const [repoUrl, setRepoUrl] = React.useState('');
  const [error, setError] = React.useState('');

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
    event.preventDefault(); // prevent event so handleInputChange is not triggered
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
          type="search"
          id="repo-url"
          placeholder="Paste, press enter or click button to search"
          autoFocus
          autoCapitalize="off"
          value={repoUrl}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        <IconButton
          aria-label="Search repository"
          variantColor="primary"
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
