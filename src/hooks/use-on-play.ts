import { Track } from '@/app/types'
import { useUser } from '@/hooks/use-user'
import { usePlayer } from '@/hooks/use-player'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { useSubscribeModal } from '@/hooks/use-subscribe-modal'

export const useOnPlay = (tracks: Track[]) => {
	const player = usePlayer()
	const authModal = useAuthModal()
	const subscribeModal = useSubscribeModal()

	const { user, subscription } = useUser()

	const onPlay = (id: number) => {
		if (!user) return authModal.onOpen()

		// UnComment to Only allow subscribed user to play track
		if (!subscription) return subscribeModal.onOpen()

		player.setId(id)

		player.setIds(tracks.map((track) => track.id))
	}

	return onPlay
}
