'use client'

import Image from 'next/image'

import { Track } from '@/app/types'
import { usePlayer } from '@/hooks/use-player'
import { useLoadImage } from '@/hooks/use-load-image'

interface Props {
	data: Track
	onClick?: (id: number) => void
}

export const MediaItem = ({ data, onClick }: Props) => {
	const player = usePlayer()
	const imageUrl = useLoadImage(data)

	const handleClick = () => {
		if (onClick) return onClick(data.id)

		return player.setId(data.id)
	}

	return (
		<div
			onClick={handleClick}
			className='flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50'
		>
			<div className='relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md'>
				<Image
					src={imageUrl || '/img/no-cover-image.png'}
					alt='Media item image'
					fill
					className='object-cover'
				/>
			</div>

			<div className='flex flex-col gap-y-1 overflow-hidden'>
				<p className='truncate text-white'>{data.title}</p>

				<p className='truncate text-sm text-neutral-400'>{data.author}</p>
			</div>
		</div>
	)
}
