import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/core';

const ReleasesPicker = () => {
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="repo-url">Repository url</FormLabel>
      <Input type="text" id="repo-url" placeholder="Start typing here..." />
    </FormControl>
  );
};

export default ReleasesPicker;
