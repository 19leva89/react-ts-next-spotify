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
		<div className="fixed w-full h-20 py-2 px-4 bottom-0 bg-black">
			<PlayerContent key={trackUrl} track={track} trackUrl={trackUrl} />
		</div>
	)
}
