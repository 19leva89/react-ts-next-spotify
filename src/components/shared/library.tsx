'use client'

import { ListMusicIcon, PlusIcon } from 'lucide-react'

import { Track } from '@/app/types'
import { useUser } from '@/hooks/use-user'
import { MediaItem } from '@/components/shared'
import { useOnPlay } from '@/hooks/use-on-play'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { useUploadModal } from '@/hooks/use-upload-modal'
import { useSubscribeModal } from '@/hooks/use-subscribe-modal'

interface Props {
	tracks: Track[]
}

export const Library = ({ tracks }: Props) => {
	const authModal = useAuthModal()
	const uploadModal = useUploadModal()
	const subscribeModal = useSubscribeModal()

	const { user, subscription } = useUser()

	const onPlay = useOnPlay(tracks)

	const onClick = () => {
		if (!user) return authModal.onOpen()

		// Only subscribed user can upload tracks
		if (!subscription) return subscribeModal.onOpen()

		return uploadModal.onOpen()
	}

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-5 pt-4'>
				<div className='inline-flex items-center gap-x-2'>
					<ListMusicIcon size={24} className='size-6 text-neutral-400' />

					<p className='text-md font-medium text-neutral-400'>Your library</p>
				</div>

				<PlusIcon
					size={20}
					onClick={onClick}
					className='size-5 cursor-pointer text-neutral-400 transition hover:text-white'
				/>
			</div>

			<div className='mt-4 flex flex-col gap-y-2 px-3'>
				{tracks.map((track) => (
					<MediaItem key={track.id} data={track} onClick={(id: number) => onPlay(id)} />
				))}
			</div>
		</div>
	)
}
