'use client'

import Image from 'next/image'

import { Track } from '@/app/types'
import { PlayButton } from '@/components/shared'
import { useLoadImage } from '@/hooks/use-load-image'

interface Props {
	data: Track
	onClick: (id: number) => void
}

export const TrackItem = ({ data, onClick }: Props) => {
	const imagePath = useLoadImage(data)

	return (
		<div
			onClick={() => onClick(data.id)}
			className='group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-1 transition hover:bg-neutral-400/10'
		>
			<div className='relative aspect-square size-full overflow-hidden rounded-md'>
				<Image
					src={imagePath || '/img/no-cover-image.png'}
					alt='Album artwork'
					fill
					className='object-cover'
				/>
			</div>

			<div className='flex w-full flex-col items-start gap-y-1 p-2'>
				<p className='w-full truncate font-semibold text-white'>{data.title}</p>

				<p className='w-full truncate pb-1 text-sm text-neutral-400'>by {data.author}</p>
			</div>

			<div className='absolute right-3 bottom-20'>
				<PlayButton />
			</div>
		</div>
	)
}
