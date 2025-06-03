'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { PlayButton } from '@/components/shared'

interface Props {
	href: string
	image: string
	name: string
}

export const ListItem = ({ href, image, name }: Props) => {
	const router = useRouter()

	const onClick = () => {
		router.push(href)
	}

	return (
		<div
			onClick={onClick}
			className='group relative flex cursor-pointer items-center justify-between gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20'
		>
			<div className='flex items-center gap-x-4'>
				<div className='relative min-h-[64px] min-w-[64px]'>
					<Image src={image} alt='LikeImage' className='object-cover' fill />
				</div>

				<p className='truncate py-5 font-medium text-white'>{name}</p>
			</div>

			<PlayButton />
		</div>
	)
}
