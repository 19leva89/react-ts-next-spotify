import { request } from '@/lib/api'
import type { AddTrackInput, GetAllTracksParams, Track } from '@/app/types'

export const getAllGenres = async (): Promise<string[]> => {
	return await request<string[]>({
		url: '/api/genres',
		method: 'GET',
	})
}

export const getAllTracks = async ({
	page = 1,
	limit = 10,
	sort,
	order,
	search,
	genre,
	artist,
}: GetAllTracksParams): Promise<{
	data: Track[]
	meta: { total: number; page: number; totalPages: number }
}> => {
	const response = await request<{
		data: Track[]
		meta: { total: number; page: number; totalPages: number }
	}>({
		url: '/api/tracks',
		method: 'GET',
		params: { page, limit, sort, order, search, genre, artist },
	})

	return response
}

export const addTrack = async (input: AddTrackInput): Promise<Track> => {
	return await request<Track>({
		url: '/api/tracks',
		method: 'POST',
		data: input,
	})
}

export const getTrackById = async (id: string): Promise<Track> => {
	return await request<Track>({
		url: `/api/tracks/${id}`,
		method: 'GET',
	})
}

export const updateTrackById = async (id: string, input: Partial<AddTrackInput>): Promise<Track> => {
	return await request<Track>({
		url: `/api/tracks/${id}`,
		method: 'PUT',
		data: input,
	})
}

export const removeTrack = async (id: string): Promise<void> => {
	await request({
		url: `/api/tracks/${id}`,
		method: 'DELETE',
	})
}

export const removeTracks = async (ids: string[]): Promise<void> => {
	await request({
		url: '/api/tracks/delete',
		method: 'POST',
		data: { ids },
	})
}

export const uploadTrackFile = async (id: string, file: File): Promise<void> => {
	const formData = new FormData()
	formData.append('file', file)

	await request({
		url: `/api/tracks/${id}/upload`,
		method: 'POST',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}

export const deleteTrackFile = async (id: string, file: File): Promise<void> => {
	const formData = new FormData()
	formData.append('file', file)

	await request({
		url: `/api/tracks/${id}/file`,
		method: 'DELETE',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}
