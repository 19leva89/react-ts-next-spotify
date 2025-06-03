'use client'

import { Track } from '@/app/types'
import { TrackItem } from '@/components/shared'
import { useOnPlay } from '@/hooks/use-on-play'

interface Props {
	tracks: Track[]
}

export const PageContent = ({ tracks }: Props) => {
	const onPlay = useOnPlay(tracks)

	if (!Array.isArray(tracks) || tracks.length === 0) {
		return <div className='mx-6 mt-4 text-neutral-400'>No tracks available</div>
	}

	return (
		<div className='m-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
			{tracks.map((track) => (
				<TrackItem
					key={track.id}
					data={track}
					onClick={(id: number) => {
						onPlay(id)
					}}
				/>
			))}
		</div>
	)
}
