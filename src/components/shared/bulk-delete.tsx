'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui'
import { removeTracks } from '@/app/actions'

interface Props {
	allTrackIds: string[]
	selectedIds: string[]
	clear: () => void
	toggleAll: (ids: string[]) => void
	toggleSelecting: () => void
	isSelecting: boolean
}

export const BulkDelete = ({
	allTrackIds,
	selectedIds,
	clear,
	toggleAll,
	toggleSelecting,
	isSelecting,
}: Props) => {
	const router = useRouter()

	const handleSelectAll = () => {
		toggleAll(allTrackIds)
	}

	const handleDelete = async () => {
		await removeTracks(selectedIds)

		clear()
		router.refresh()
	}

	return (
		<div className="flex items-center gap-2">
			<Button variant="default" onClick={toggleSelecting}>
				{isSelecting ? 'Cancel' : 'Click for Bulk Delete'}
			</Button>

			{isSelecting && (
				<>
					<Button variant="secondary" onClick={handleSelectAll}>
						Select All
					</Button>

					<Button variant="destructive" onClick={handleDelete}>
						Delete Selected
					</Button>
				</>
			)}
		</div>
	)
}
