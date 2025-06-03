'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Track } from '@/app/types'
import { useUser } from '@/hooks/use-user'
import { useOnPlay } from '@/hooks/use-on-play'
import { LikeButton, MediaItem } from '@/components/shared'

interface Props {
	tracks: Track[]
}

export const LikedContent = ({ tracks }: Props) => {
	const router = useRouter()

	const { user, isLoading } = useUser()

	const onPlay = useOnPlay(tracks)

	useEffect(() => {
		if (!isLoading && !user) router.replace('/')
	}, [isLoading, user, router])

	if (tracks.length === 0)
		return <div className='flex w-full flex-col gap-y-2 px-6 text-neutral-400'>No liked tracks</div>

	return (
		<div className='flex w-full flex-col gap-y-2 p-6'>
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
