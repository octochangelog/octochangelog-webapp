import React from 'react';
import {
  FormControl,
  FormControlProps,
  FormLabel,
  Select,
} from '@chakra-ui/core';

type CustomProps = {
  label: string;
  placeholder?: string;
  onSuccess(version: string): void;
  value?: string;
};

type PropTypes = FormControlProps & CustomProps;

const ReleaseVersionFormControl: React.FC<PropTypes> = ({
  children,
  label,
  id,
  placeholder = 'Select version',
  onSuccess,
  value,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSuccess(e.target.value);
  };

  return (
    <FormControl isRequired width="full" {...rest}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default ReleaseVersionFormControl;
