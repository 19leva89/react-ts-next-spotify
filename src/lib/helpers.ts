import { Price } from '@/app/types'

export function absoluteUrl(path: string): string {
	// If in a browser, return the relative path
	if (typeof window !== 'undefined') {
		return path
	}

	// Define the base URL
	const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: `http://localhost:${process.env.PORT || 3000}`

	// Remove extra slashes to avoid format errors
	return new URL(path, baseUrl).toString()
}

export const postData = async ({ url, data }: { url: string; data?: { price: Price } }) => {
	console.log('POST REQUEST!', url, data)

	const res: Response = await fetch(url, {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		credentials: 'same-origin',
		body: JSON.stringify(data),
	})

	if (!res.ok) {
		console.log('Error in postData', { url, data, res })

		throw Error(res.statusText)
	}

	return res.json()
}

export const toDateTime = (secs: number) => {
	const time = new Date('1970-01-01T00:30:00Z') // Unix Epoch Start.

	time.setSeconds(secs)

	return time
}
