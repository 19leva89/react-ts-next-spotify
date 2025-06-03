'use client'

import { usePlayer } from '@/hooks/use-player'
import { PlayerContent } from '@/components/shared'
import { useLoadTrackUrl } from '@/hooks/use-load-track-url'
import { useGetTrackById } from '@/hooks/use-get-track-by-id'

export const Player = () => {
	const player = usePlayer()
	const { track } = useGetTrackById(player.activeId)

	const trackUrl = useLoadTrackUrl(track!)

	if (!track || !trackUrl || !player.activeId) return null

	return (
		<div className='fixed bottom-0 h-20 w-full bg-black px-4 py-2'>
			<PlayerContent key={trackUrl} track={track} trackUrl={trackUrl} />
		</div>
	)
}
