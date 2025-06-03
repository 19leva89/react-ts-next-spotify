import { PlayIcon } from 'lucide-react'

import { Button } from '@/components/ui'

interface Props {
	onClick?: () => void
	size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const PlayButton = ({ onClick, size = 'icon' }: Props) => {
	return (
		<Button
			variant='outline'
			size={size}
			onClick={onClick}
			className='translate translate-y-1/4 cursor-pointer rounded-full border-green-500 bg-green-500 opacity-0 drop-shadow-md group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 hover:border-white'
		>
			<PlayIcon className='size-5 text-black' />
		</Button>
	)
}
