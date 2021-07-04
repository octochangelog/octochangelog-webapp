import {
  FormControl,
  FormControlProps,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { ChangeEvent, ReactNode } from 'react'
import { Except } from 'type-fest'

import { Release } from '~/models'
import { getReleaseVersion } from '~/utils'

interface CustomProps {
  label: string
  placeholder?: string
  value?: string
  isLoading?: boolean
  options: Release[]
  onChange(version: string): void
}

type ReleaseVersionFormControlProps = Except<
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
        value={value}
        onChange={handleChange}
      >
        {renderReleasesOptions(options)}
      </Select>
    </FormControl>
  )
}

export default ReleaseVersionFormControl
