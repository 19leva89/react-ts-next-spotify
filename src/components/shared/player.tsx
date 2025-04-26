'use client'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui'
import { usePlayer } from '@/hooks/use-player'
import { Wavesurfer } from '@/components/shared'
import { BACKEND_API_URL } from '@/lib/constants'
import { useGetTrackById } from '@/hooks/use-get-track-by-id'

export const Player = () => {
	const player = usePlayer()
	const { track } = useGetTrackById(player.currentTrack?.slug || '')

	const fullUrl = `${BACKEND_API_URL}/files/${track?.audioFile}`

	if (!player || !fullUrl || !player.currentTrack) return null

	return (
		<div className="fixed w-full h-30 bg-black">
			<Button variant="link" onClick={player.clearTrack} className="absolute -top-1 right-1">
				<XIcon className="size-4 text-white" />
			</Button>

			<div className="flex flex-col items-center gap-4">
				{track ? (
					<Wavesurfer audioUrl={fullUrl} />
				) : (
					<p className="text-sm text-muted-foreground">No audio file found</p>
				)}
			</div>
		</div>
	)
}
