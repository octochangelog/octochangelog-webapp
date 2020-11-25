import {
  FormControl,
  FormControlProps,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import * as React from 'react'

interface CustomProps {
  label: string
  placeholder?: string
  onChange(version: string): void
  value?: string
  isLoading?: boolean
}

type ReleaseVersionFormControlProps = Omit<FormControlProps, 'onChange'> &
  CustomProps

const ReleaseVersionFormControl = ({
  children,
  label,
  id,
  placeholder = 'Choose a version',
  onChange,
  value,
  isLoading = false,
  ...rest
}: ReleaseVersionFormControlProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <FormControl isRequired width="full" {...rest}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        id={id}
        placeholder={isLoading ? 'Loading...' : placeholder}
        onChange={handleChange}
        value={value}
      >
        {children}
      </Select>
    </FormControl>
  )
}

export default ReleaseVersionFormControl
