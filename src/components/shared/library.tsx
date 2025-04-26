'use client'

import { ListMusicIcon, PlusIcon } from 'lucide-react'

import { Track } from '@/app/types'
import { useUser } from '@/hooks/use-user'
import { MediaItem } from '@/components/shared'
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

	// const onPlay = useOnPlay(tracks)

	const onClick = () => {
		if (!user) return authModal.onOpen()

		// Only subscribed user can upload tracks
		// if (!subscription) return subscribeModal.onOpen()

		return uploadModal.onOpen()
	}

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between px-5 pt-4">
				<div className="inline-flex items-center gap-x-2">
					<ListMusicIcon size={24} className="size-6 text-neutral-400" />

					<p className="text-neutral-400 font-medium text-md">Your library</p>
				</div>

				<PlusIcon
					size={20}
					onClick={onClick}
					className="size-5 text-neutral-400 cursor-pointer hover:text-white transition"
				/>
			</div>

			<div className="flex flex-col gap-y-2 mt-4 px-3">
				{tracks.map((track) => (
					<MediaItem onClick={() => {}} key={track.id} data={track} />
				))}
			</div>
		</div>
	)
}
