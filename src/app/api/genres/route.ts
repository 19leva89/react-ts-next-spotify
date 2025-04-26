import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { BACKEND_API_URL } from '@/lib/constants'

export async function GET(req: NextRequest) {
	try {
		const response = await axios.get(`${BACKEND_API_URL}/genres`, {
			headers: {
				'Content-Type': 'application/json',
			},
		})

		return NextResponse.json(response.data)
	} catch (error: any) {
		return NextResponse.json(
			{ error: error?.response?.data?.message || error.message || 'Failed to fetch genres' },
			{ status: error?.response?.status || 500 },
		)
	}
}
