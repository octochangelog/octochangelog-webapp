'use client'

import { type FC } from 'react'

import { type NextErrorPageProps } from '@/models'

import UIError from './UIError'

const RootErrorPage: FC<NextErrorPageProps> = ({ error, reset }) => {
	return <UIError error={error} reset={reset} />
}

export default RootErrorPage
