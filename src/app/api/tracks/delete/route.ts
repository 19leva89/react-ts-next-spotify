import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { BACKEND_API_URL } from '@/lib/constants'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		const url = `${BACKEND_API_URL}/tracks/delete`

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
