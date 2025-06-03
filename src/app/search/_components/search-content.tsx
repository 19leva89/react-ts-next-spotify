'use client'

import { Track } from '@/app/types'
import { useOnPlay } from '@/hooks/use-on-play'
import { LikeButton, MediaItem } from '@/components/shared'

interface Props {
	tracks: Track[]
}

export const SearchContent = ({ tracks }: Props) => {
	const onPlay = useOnPlay(tracks)

	if (tracks.length === 0)
		return <div className='flex w-full flex-col gap-y-2 px-6 text-neutral-400'>No tracks found</div>

	return (
		<div className='flex w-full flex-col gap-y-2 px-6'>
			{tracks.map((track) => (
				<div key={track.id} className='flex w-full items-center gap-x-4'>
					<div className='flex-1'>
						<MediaItem data={track} onClick={(id: number) => onPlay(id)} />
					</div>

					<LikeButton trackId={track.id} />
				</div>
			))}
		</div>
	)
}
