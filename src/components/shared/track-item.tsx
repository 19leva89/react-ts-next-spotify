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
			className="relative group flex flex-col items-center justify-center gap-x-4 p-1 rounded-md overflow-hidden bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition"
		>
			<div className="relative aspect-square size-full rounded-md overflow-hidden">
				<Image
					src={imagePath || '/img/no-cover-image.png'}
					alt="Album artwork"
					fill
					className="object-cover"
				/>
			</div>

			<div className="flex flex-col items-start w-full gap-y-1 p-2">
				<p className="w-full text-white font-semibold truncate">{data.title}</p>

				<p className="w-full pb-1 text-neutral-400 text-sm truncate">by {data.author}</p>
			</div>

			<div className="absolute bottom-20 right-3">
				<PlayButton />
			</div>
		</div>
	)
}
