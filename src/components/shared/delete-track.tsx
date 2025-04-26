'use client'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui'
import { Track } from '@/app/types'
import { removeTrack } from '@/app/actions'

interface Props {
	track: Track
	isOpen: boolean
	onClose: () => void
}

export const DeleteTrack = ({ track, isOpen, onClose }: Props) => {
	const router = useRouter()

	const handleDelete = async () => {
		try {
			await removeTrack(track.id)

			toast.success('Track deleted successfully')

			router.refresh()
		} catch (error) {
			toast.error('Failed to delete the track')
		}
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent className="px-8 rounded-xl">
				<AlertDialogHeader>
					<AlertDialogTitle>Delete {track.title}?</AlertDialogTitle>

					<AlertDialogDescription>
						Are you sure you want to delete this track from your library? This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter className="gap-3">
					<AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>

					<AlertDialogAction onClick={handleDelete} className="rounded-xl">
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
