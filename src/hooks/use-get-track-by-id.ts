import { toast } from 'sonner'
import { useEffect, useMemo, useState } from 'react'

import { Track } from '@/app/types'
import { createClient } from '@/utils/supabase/client'

export const useGetTrackById = (id?: number) => {
	const supabase = createClient()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [track, setTrack] = useState<Track | undefined>(undefined)

	useEffect(() => {
		if (!id) return

		setIsLoading(true)

		const fetchTrack = async () => {
			const { data, error } = await supabase.from('tracks').select('*').eq('id', id).single()

			if (error) {
				setIsLoading(false)
				return toast.error(error.message)
			}

			setTrack(data as Track)
			setIsLoading(false)
		}

		fetchTrack()
	}, [id, supabase])

	return useMemo(() => ({ isLoading, track }), [isLoading, track])
}
