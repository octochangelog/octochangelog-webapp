import React from 'react';
import {
  FormControl,
  FormControlProps,
  FormLabel,
  Select,
} from '@chakra-ui/core';

type CustomProps = {
  label: string;
};

type PropTypes = FormControlProps & CustomProps;

const ReleaseVersionSelect: React.FC<PropTypes> = ({
  children,
  label,
  id,
  ...rest
}) => {
  return (
    <FormControl isRequired width="full" {...rest}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select id={id} placeholder="Select version">
        {children}
      </Select>
    </FormControl>
  );
};

export default ReleaseVersionSelect;
