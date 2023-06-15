import { NextResponse } from 'next/server'

import { octokit } from '~/github-client'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const q = searchParams.get('q')

	if (!q) {
		return NextResponse.json('`q` param must be provided', { status: 500 })
	}

	const response = await octokit.search.repos({ q, per_page: 100 })

	// TODO: handle errors

	return NextResponse.json(response.data)
}
