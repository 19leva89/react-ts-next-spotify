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
			className="relative group flex items-center gap-x-4 pr-4 rounded-md cursor-pointer overflow-hidden bg-neutral-100/10 hover:bg-neutral-100/20 transition"
		>
			<div className="relative min-h-[64px] min-w-[64px]">
				<Image src={image} alt="LikeImage" className="object-cover" fill />
			</div>

			<p className="py-5 text-white font-medium truncate">{name}</p>

			<PlayButton />
		</div>
	)
}
