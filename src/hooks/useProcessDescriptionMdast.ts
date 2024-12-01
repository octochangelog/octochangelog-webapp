import { type ReactNode, useEffect, useMemo, useState } from 'react'
import * as prod from 'react/jsx-runtime'
import rehypeHighlight from 'rehype-highlight'
import rehype2react, { type Options as RehypeReactOptions } from 'rehype-react'
import emoji from 'remark-emoji'
import gfm from 'remark-gfm'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import markdown from 'remark-stringify'
import { unified, type Processor } from 'unified'

import {
	type ComponentsMapping,
	type ProcessedRelease,
	type Repository,
} from '@/models'

interface HookArgs {
	repository: Repository
	description: ProcessedRelease['descriptionMdast']
	componentsMapping: ComponentsMapping
}

interface HookReturnedValue {
	processedDescription: ReactNode
	isProcessing: boolean
}

const rehypeReactOptions: RehypeReactOptions = prod

function processDescriptionAsync(
	description: ProcessedRelease['descriptionMdast'],
	components: ComponentsMapping,
): Promise<ReactNode> {
	rehypeReactOptions.components = components

	return new Promise((resolve, reject) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
		const processor: Processor = unified()
			.use(parse)
			.use(gfm)
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			.use(emoji, { accessible: true })
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			.use(remark2rehype)
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			.use(rehypeHighlight)
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			.use(rehype2react, rehypeReactOptions)

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
		const markdownProcessor: Processor = unified().use(markdown).use(gfm)

		processor.process(markdownProcessor.stringify(description), (err, file) => {
			if (err) {
				reject(err)
			} else if (!file?.result) {
				reject(new Error('Result not generated'))
			} else {
				resolve(file.result as Parameters<typeof resolve>[0])
			}
		})
	})
}

function useProcessDescriptionMdast({
	repository,
	description,
	componentsMapping,
}: HookArgs): HookReturnedValue {
	const [processedDescription, setProcessedDescription] =
		useState<ReactNode | null>(null)

	const [isProcessing, setIsProcessing] = useState(true)

	useEffect(() => {
		const handleProcessDescription = async () => {
			setIsProcessing(true)
			const result = await processDescriptionAsync(
				description,
				componentsMapping,
			)

			setProcessedDescription(result)
			setIsProcessing(false)
		}

		void handleProcessDescription()
	}, [componentsMapping, description, repository.html_url])

	const data = useMemo(
		() => ({
			processedDescription,
			isProcessing,
		}),
		[isProcessing, processedDescription],
	)

	return data
}

export default useProcessDescriptionMdast
