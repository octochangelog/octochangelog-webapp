import { type NextRequest } from 'next/server'

import { obtainAccessToken } from '~/github-client'

export async function POST(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const codeParam = searchParams.get('code')
	console.log('code', codeParam)

	if (!codeParam) {
		throw new Error('Missing GitHub auth code')
	}

	const accessToken = await obtainAccessToken(codeParam)
	return Response.json({ accessToken })
}
