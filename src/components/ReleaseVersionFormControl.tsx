import {
  FormControl,
  FormControlProps,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { ChangeEvent, ReactNode } from 'react'

import { Release } from '~/models'
import { getReleaseVersion } from '~/utils'

interface CustomProps {
  label: string
  placeholder?: string
  onChange(version: string): void
  value?: string
  isLoading?: boolean
  options: Release[]
}

type ReleaseVersionFormControlProps = Omit<
  FormControlProps,
  'onChange' | 'children'
> &
  CustomProps

function renderReleasesOptions(releases?: Release[]): ReactNode[] | null {
  if (!releases) {
    return null
  }

  return releases.map((release) => (
    <option key={release.id} value={release.tag_name}>
      {getReleaseVersion(release)}
    </option>
  ))
}

const ReleaseVersionFormControl = ({
  options,
  label,
  id,
  placeholder = 'Choose a version',
  onChange,
  value,
  isLoading = false,
  ...rest
}: ReleaseVersionFormControlProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
        {renderReleasesOptions(options)}
      </Select>
    </FormControl>
  )
}

export default ReleaseVersionFormControl
