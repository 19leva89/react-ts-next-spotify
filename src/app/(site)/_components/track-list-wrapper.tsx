'use client'

import { Track } from '@/app/types'
import { BulkDelete } from '@/components/shared'
import { PageContent } from '@/app/(site)/_components'
import { useTrackSelection } from '@/hooks/use-track-selection'

type Props = {
	tracks: Track[]
}

export const TrackListWrapper = ({ tracks }: Props) => {
	const { isSelecting, selectedIds, isSelected, toggleTrack, toggleAll, clear, toggleSelecting } =
		useTrackSelection()

	return (
		<div className="flex flex-col gap-4 mx-6">
			<PageContent tracks={tracks} isSelecting={isSelecting} isSelected={isSelected} onSelect={toggleTrack} />

			<div className="flex items-center gap-2">
				<BulkDelete
					allTrackIds={tracks.map((t) => t.id)}
					selectedIds={selectedIds}
					clear={clear}
					toggleAll={toggleAll}
					toggleSelecting={toggleSelecting}
					isSelecting={isSelecting}
				/>
			</div>
		</div>
	)
}
