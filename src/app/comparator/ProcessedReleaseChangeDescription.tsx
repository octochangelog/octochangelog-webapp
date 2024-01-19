import {
	Box,
	type BoxProps,
	Code,
	Heading,
	Icon,
	Link,
	type LinkProps,
	List,
	ListItem,
	type ListItemProps,
	Tag,
	TagLabel,
	Text,
} from '@chakra-ui/react'
import { HiOutlineExternalLink } from 'react-icons/hi'

import BlockQuote from '@/components/BlockQuote'
import TextSkeleton from '@/components/TextSkeleton'
import useProcessDescriptionMdast from '@/hooks/useProcessDescriptionMdast'
import { type ProcessedRelease, type Repository } from '@/models'
import { getReleaseVersion } from '@/utils'

type RemarkComponentProps = Record<string, unknown>

const RemarkH1 = (props: RemarkComponentProps) => (
	<Heading as="h2" size="xl" mb="4" {...props} />
)

const RemarkH2 = (props: RemarkComponentProps) => (
	<Heading as="h3" size="lg" mb="4" {...props} />
)

const RemarkH3 = (props: RemarkComponentProps) => (
	<Heading as="h4" size="md" mb="4" {...props} />
)

const RemarkH4 = (props: RemarkComponentProps) => (
	<Heading as="h5" size="sm" mb="4" {...props} />
)

const RemarkH5 = (props: RemarkComponentProps) => (
	<Heading as="h6" size="xs" mb="2" {...props} />
)
const RemarkH6 = (props: RemarkComponentProps) => (
	<Heading as="h6" size="xs" mb="2" {...props} />
)

const RemarkP = (props: RemarkComponentProps) => <Text mb="2" {...props} />

const RemarkA = ({ href, children, ...rest }: LinkProps) => (
	<Link isExternal href={href} {...rest}>
		{children} <Icon as={HiOutlineExternalLink} mx="2px" />
	</Link>
)

const RemarkUl = (props: RemarkComponentProps) => (
	<List styleType="disc" mb="4" ml="4" stylePosition="outside" {...props} />
)

const RemarkOl = (props: RemarkComponentProps) => (
	<List
		as="ol"
		styleType="decimal"
		mb="4"
		ml="4"
		stylePosition="outside"
		{...props}
	/>
)

const RemarkLi = (props: ListItemProps) => <ListItem {...props} />

const RemarkPre = (props: RemarkComponentProps) => (
	<Code
		as="pre"
		display="block"
		bgColor="background2"
		mb="4"
		p="3"
		overflowX="auto"
		{...props}
	/>
)

const RemarkCode = (props: RemarkComponentProps) => (
	<Code color="inherit" bgColor="background2" {...props} />
)

const RemarkBlockquote = (props: RemarkComponentProps) => (
	<BlockQuote mb="2" {...props} />
)

const remarkReactComponents = {
	h1: RemarkH1,
	h2: RemarkH2,
	h3: RemarkH3,
	h4: RemarkH4,
	h5: RemarkH5,
	h6: RemarkH6,
	p: RemarkP,
	a: RemarkA,
	ul: RemarkUl,
	ol: RemarkOl,
	li: RemarkLi,
	pre: RemarkPre,
	code: RemarkCode,
	blockquote: RemarkBlockquote,
}

interface ProcessedReleaseChangeProps extends BoxProps {
	repository: Repository
	processedReleaseChange: ProcessedRelease
}

const ProcessedReleaseChangeDescription = ({
	processedReleaseChange,
	repository,
	...rest
}: ProcessedReleaseChangeProps) => {
	const { processedDescription, isProcessing } = useProcessDescriptionMdast({
		repository,
		description: processedReleaseChange.descriptionMdast,
		componentsMapping: remarkReactComponents,
	})

	return (
		<Box {...rest} mb={8}>
			{isProcessing ? (
				<TextSkeleton />
			) : (
				<>
					<Link isExternal href={processedReleaseChange.html_url}>
						<Tag
							color="secondary.900"
							size="lg"
							mb={2}
							rounded="full"
							bgColor="secondary.200"
							_hover={{ bgColor: 'secondary.300' }}
							_active={{ bgColor: 'secondary.200', color: 'secondary.900' }}
						>
							<TagLabel>{getReleaseVersion(processedReleaseChange)}</TagLabel>
						</Tag>
					</Link>
					<Box ml={4}>{processedDescription}</Box>
				</>
			)}
		</Box>
	)
}

export default ProcessedReleaseChangeDescription
