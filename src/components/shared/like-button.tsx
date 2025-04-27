'use client'

import { toast } from 'sonner'
import { HeartIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useUser } from '@/hooks/use-user'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { createClient } from '@/utils/supabase/client'

interface Props {
	trackId: number
}

export const LikeButton = ({ trackId }: Props) => {
	const router = useRouter()
	const supabase = createClient()
	const authModal = useAuthModal()

	const { user } = useUser()

	const [isLiked, setIsLiked] = useState<boolean>(false)

	useEffect(() => {
		if (!user?.id) return

		const fetchData = async () => {
			const { data, error } = await supabase
				.from('liked_tracks')
				.select('*')
				.eq('user_id', user.id)
				.eq('track_id', trackId)
				.single()

			if (!error && data) setIsLiked(true)
		}

		fetchData()
	}, [trackId, supabase, user?.id])

	const handleLike = async () => {
		if (!user) return authModal.onOpen()

		if (isLiked) {
			const { error } = await supabase
				.from('liked_tracks')
				.delete()
				.eq('user_id', user.id)
				.eq('track_id', trackId)

			if (error) {
				console.error(error)

				toast.error(error.message)
			} else {
				setIsLiked(false)
			}
		} else {
			const { error } = await supabase.from('liked_tracks').insert({
				track_id: trackId,
				user_id: user.id,
			})

			if (error) {
				console.error(error)

				toast.error(error.message)
			} else {
				setIsLiked(true)
				toast.success('Liked!')
			}
		}

		router.refresh()
	}

	return (
		<button onClick={handleLike} className="hover:opacity-75 transition">
			{isLiked ? (
				<HeartIcon fill="#22c55e" size={25} className="text-[#22c55e]" />
			) : (
				<HeartIcon size={25} className="text-white" />
			)}
		</button>
	)
}
