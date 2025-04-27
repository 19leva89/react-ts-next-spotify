'use client'

import { Track } from '@/app/types'
import { TrackItem } from '@/components/shared'

interface Props {
	tracks: Track[]
}

export const PageContent = ({ tracks }: Props) => {
	if (!Array.isArray(tracks) || tracks.length === 0) {
		return <div className="mx-6 mt-4 text-neutral-400">No Tracks Available</div>
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-2 m-4">
			{tracks.map((track) => (
				<TrackItem
					key={track.id}
					onClick={(id: string) => {
						// onPlay(id)
					}}
					data={track}
				/>
			))}
		</div>
	)
}
