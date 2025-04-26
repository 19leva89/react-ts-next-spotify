'use client'

import Image from 'next/image'

import { Track } from '@/app/types'

interface Props {
	data: Track
	onClick?: (id: string) => void
}

export const MediaItem = ({ data, onClick }: Props) => {
	const handleClick = () => {}

	return (
		<div
			onClick={handleClick}
			className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
		>
			<div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
				<Image
					fill
					src={data.coverImage || '/img/no-cover-image.png'}
					alt="Media Item Image"
					className="object-cover"
				/>
			</div>

			<div className="flex flex-col gap-y-1 overflow-hidden">
				<p className="text-white truncate">{data.title}</p>

				<p className="text-neutral-400 text-sm truncate">{data.artist}</p>
			</div>
		</div>
	)
}
