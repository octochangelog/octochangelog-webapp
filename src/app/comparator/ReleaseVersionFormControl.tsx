import type { FormControlProps } from '@chakra-ui/react'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import type { ChangeEvent, ReactNode } from 'react'
import type { Except } from 'type-fest'

import type { Release } from '@/models'
import { getReleaseVersion } from '@/utils'

interface CustomProps {
	label: string
	placeholder?: string
	value?: string
	isLoading?: boolean
	options: Array<Release>
	onChange(version: string): void
}

type ReleaseVersionFormControlProps = CustomProps &
	Except<FormControlProps, 'children' | 'onChange'>

function renderReleasesOptions(
	releases?: Array<Release>,
): Array<ReactNode> | null {
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
			<FormLabel htmlFor={id} noOfLines={1}>
				{label}
			</FormLabel>
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
