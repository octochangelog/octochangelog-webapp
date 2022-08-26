import type { FC, ReactElement, ReactNode } from 'react'

import useIsClientSide from '~/hooks/useIsClientSide'

type ConditionallyRenderProps =
	| {
			children: ReactNode
			isOnlyClient: true
			isOnlyServer?: undefined | false
	  }
	| {
			children: ReactNode
			isOnlyClient?: undefined | false
			isOnlyServer: true
	  }

const ConditionallyRender: FC<ConditionallyRenderProps> = ({
	isOnlyClient,
	isOnlyServer,
	children,
}: ConditionallyRenderProps) => {
	const isClientSide = useIsClientSide()

	if (isOnlyClient && !isClientSide) {
		return null
	}

	if (isOnlyServer && isClientSide) {
		return null
	}

	return children as ReactElement
}

export default ConditionallyRender
