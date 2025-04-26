import { create } from 'zustand'

import { Track } from '@/app/types'

interface PlayerStore {
	currentTrack: Track | undefined
	setTrack: (track: Track) => void
	clearTrack: () => void
}

export const usePlayer = create<PlayerStore>((set) => ({
	currentTrack: undefined,
	setTrack: (track) => set({ currentTrack: track }),
	clearTrack: () => set({ currentTrack: undefined }),
}))
