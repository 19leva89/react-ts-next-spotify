'use client'

import { Track } from '@/app/types'
import { LikeButton, MediaItem } from '@/components/shared'
// import useOnPlay from "@/hooks/useOnPlay";

interface Props {
	tracks: Track[]
}

export const SearchContent = ({ tracks }: Props) => {
	// const onPlay = useOnPlay(tracks)

	if (tracks.length === 0)
		return <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No tracks found</div>

	return (
		<div className="flex flex-col gap-y-2 w-full px-6">
			{tracks.map((track) => (
				<div key={track.id} className="flex items-center gap-x-4 w-full">
					<div className="flex-1">
						<MediaItem data={track} onClick={(id: number) => {}} />
					</div>

					<LikeButton trackId={track.id} />
				</div>
			))}
		</div>
	)
}
