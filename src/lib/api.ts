import axios, { AxiosRequestConfig } from 'axios'

import { absoluteUrl } from './utils'

export const api = axios.create({
	baseURL: absoluteUrl('/'),
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: false,
})

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
	try {
		const response = await api.request<T>(config)

		return response.data
	} catch (error: any) {
		const message = error.response?.data?.message || error.message || 'Unknown error'

		console.error('API error:', message)

		throw new Error(message)
	}
}
