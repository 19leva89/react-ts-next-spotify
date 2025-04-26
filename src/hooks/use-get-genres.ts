import { create } from 'zustand'

import { getAllGenres } from '@/app/actions'

interface GenreState {
	genres: string[]
	isLoading: boolean
	loadGenres: () => Promise<void>
}

export const useGetGenres = create<GenreState>((set) => ({
	genres: [],
	isLoading: false,
	loadGenres: async () => {
		set({ isLoading: true })

		try {
			const genres = await getAllGenres()

			set({ genres })
		} catch (error) {
			console.error('Failed to fetch genres', error)
		} finally {
			set({ isLoading: false })
		}
	},
}))
