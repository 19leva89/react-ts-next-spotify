import { Track } from '@/app/types'
import { createClient } from '@/utils/supabase/client'

export const useLoadImage = (track: Track) => {
	const supabase = createClient()

	if (!track) return null

	const { data: imageData } = supabase.storage.from('images').getPublicUrl(track.image_path)

	return imageData.publicUrl
}
