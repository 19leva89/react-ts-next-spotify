import { useState } from 'react'

export const useTrackSelection = () => {
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [isSelecting, setIsSelecting] = useState<boolean>(false)

	const toggleSelecting = () => setIsSelecting((prev) => !prev)

	const toggleTrack = (id: string) => {
		setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
	}

	const toggleAll = (ids: string[]) => {
		setSelectedIds((prev) => (prev.length === ids.length ? [] : ids))
	}

	const clear = () => {
		setIsSelecting(false)
		setSelectedIds([])
	}

	const isSelected = (id: string) => selectedIds.includes(id)

	return {
		isSelecting,
		selectedIds,
		toggleTrack,
		toggleAll,
		clear,
		isSelected,
		toggleSelecting,
	}
}
