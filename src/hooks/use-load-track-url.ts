import { Track } from '@/app/types'
import { createClient } from '@/utils/supabase/client'

export const useLoadTrackUrl = (track: Track) => {
	const supabase = createClient()

	if (!track) return ''

	const { data: trackData } = supabase.storage.from('tracks').getPublicUrl(track.track_path)

	return trackData.publicUrl
}
