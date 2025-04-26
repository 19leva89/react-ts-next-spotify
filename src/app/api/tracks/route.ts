import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { BACKEND_API_URL } from '@/lib/constants'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	const page = searchParams.get('page') ?? '1'
	const limit = searchParams.get('limit') ?? '10'
	const sort = searchParams.get('sort') ?? 'createdAt'
	const order = searchParams.get('order') ?? 'desc'
	const search = searchParams.get('search') ?? ''
	const genre = searchParams.get('genre') ?? ''
	const artist = searchParams.get('artist') ?? ''

	const url = `${BACKEND_API_URL}/tracks`

	try {
		const { data } = await axios.get(url, {
			params: { page, limit, sort, order, search, genre, artist },
			headers: {
				'Content-Type': 'application/json',
			},
		})

		return NextResponse.json(data)
	} catch (error: any) {
		const message = error.response?.data || error.message || 'Internal Error'
		const status = error.response?.status || 500
		return NextResponse.json({ error: message }, { status })
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		const url = `${BACKEND_API_URL}/tracks`

		const { data } = await axios.post(url, body, {
			headers: {
				'Content-Type': 'application/json',
			},
		})

		return NextResponse.json(data)
	} catch (error: any) {
		const message = error.response?.data || error.message || 'Internal Server Error'
		const status = error.response?.status || 500
		return NextResponse.json({ error: message }, { status })
	}
}
