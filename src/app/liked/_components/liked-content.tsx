'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// import useOnPlay from '@/hooks/useOnPlay'
import { Track } from '@/app/types'
import { useUser } from '@/hooks/use-user'
import { LikeButton, MediaItem } from '@/components/shared'

interface Props {
	tracks: Track[]
}

export const LikedContent = ({ tracks }: Props) => {
	console.log('tracks', tracks)
	const router = useRouter()

	const { user, isLoading } = useUser()

	// const onPlay = useOnPlay(tracks)

	useEffect(() => {
		if (!isLoading && !user) router.replace('/')
	}, [isLoading, user, router])

	if (tracks.length === 0)
		return <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No liked tracks</div>

	return (
		<div className="flex flex-col gap-y-2 w-full p-6">
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
