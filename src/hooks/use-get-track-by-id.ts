import { useEffect, useState } from 'react'

import { Track } from '@/app/types'
import { getTrackById } from '@/app/actions'

export const useGetTrackById = (id: string) => {
	const [track, setTrack] = useState<Track | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchTrack = async () => {
			try {
				setIsLoading(true)
				setError(null)

				const fetchedTrack = await getTrackById(id)
				setTrack(fetchedTrack)
			} catch (error) {
				console.error('Error fetching track:', error)

				setError('Failed to fetch track')
			} finally {
				setIsLoading(false)
			}
		}

		if (id) {
			fetchTrack()
		}
	}, [id])

	return { track, isLoading, error }
}
