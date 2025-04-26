import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { BACKEND_API_URL } from '@/lib/constants'

interface Props {
	params: Promise<{ id: string }>
}

export async function POST(req: NextRequest, { params }: Props) {
	try {
		const { id } = await params

		if (!id) {
			return NextResponse.json({ error: 'Track ID is required' }, { status: 400 })
		}

		const formData = await req.formData()
		const file = formData.get('file') as File

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 })
		}

		const backendForm = new FormData()
		backendForm.set('file', file)

		const url = `${BACKEND_API_URL}/tracks/${id}/upload`

		const { data } = await axios.post(url, backendForm, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		return NextResponse.json(data)
	} catch (error: any) {
		const message = error.response?.data || error.message || 'Internal Server Error'
		const status = error.response?.status || 500
		return NextResponse.json({ error: message }, { status })
	}
}
