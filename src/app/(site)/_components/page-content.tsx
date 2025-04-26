'use client'

import { cn } from '@/lib/utils'
import { Track } from '@/app/types'
import { Checkbox } from '@/components/ui'
import { TrackCard } from '@/app/(site)/_components'

interface Props {
	tracks: Track[]
	isSelecting?: boolean
	isSelected?: (id: string) => boolean
	onSelect?: (id: string) => void
}

export const PageContent = ({ tracks, isSelecting, isSelected, onSelect }: Props) => {
	if (!Array.isArray(tracks) || tracks.length === 0) {
		return <div className="mx-6 mt-4 text-neutral-400">No Tracks Available</div>
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-2 mt-4">
			{tracks.map((track) => (
				<div
					key={track.id}
					className={cn(isSelecting && 'relative border border-white/10 p-4 rounded-lg bg-neutral-800/10')}
				>
					{isSelecting && (
						<div className="absolute top-2 left-2">
							<Checkbox checked={isSelected?.(track.id)} onCheckedChange={() => onSelect?.(track.id)} />
						</div>
					)}

					<TrackCard key={track.id} data={track} />
				</div>
			))}
		</div>
	)
}
