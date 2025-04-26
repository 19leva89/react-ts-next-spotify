export interface Track {
	id: string
	title: string
	artist: string
	album: string
	genres: string[]
	slug: string
	coverImage: string
	audioFile: string
	createdAt: string
	updatedAt: string
}

export interface TracksResponse {
	data: Track[]
	meta: {
		total: number
		page: number
		limit: number
		totalPages: number
	}
}

export interface GetAllTracksParams {
	page: number
	limit: number
	sort?: string
	order?: 'asc' | 'desc'
	search?: string
	genre?: string
	artist?: string
}

export interface AddTrackInput {
	title: string
	artist: string
	album?: string
	genres?: string[]
	coverImage?: string
}
