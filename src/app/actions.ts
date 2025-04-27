import { createClient } from '@/utils/supabase/server'
import type { ProductWithPrice, Track } from '@/app/types'

export const getTracks = async (): Promise<Track[]> => {
	const supabase = await createClient()

	const { data, error } = await supabase.from('tracks').select('*').order('created_at', { ascending: false })

	if (error) {
		console.error('DB error:', error)

		return []
	}

	// Type assertion with validation
	if (!data) return []

	return data as Track[]
}

export const getTracksByTitle = async (title: string): Promise<Track[]> => {
	const supabase = await createClient()

	if (!title) {
		const allTracks = await getTracks()
		return allTracks
	}

	const { data, error } = await supabase
		.from('tracks')
		.select('*')
		.ilike('title', `%${title}%`)
		.order('created_at', { ascending: false })

	if (error) {
		console.error('DB error:', error)

		return []
	}

	// Type assertion with validation
	if (!data) return []

	return data as Track[]
}

export const getTracksByUserId = async (): Promise<Track[]> => {
	const supabase = await createClient()

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (authError || !user?.id) {
		console.error('Authentication error:', authError)
		return []
	}

	const { data, error } = await supabase
		.from('tracks')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false })

	if (error) {
		console.error('DB error:', error)

		return []
	}

	// Type assertion with validation
	if (!data) return []

	return data as Track[]
}

export const getLikedTracks = async (): Promise<Track[]> => {
	const supabase = await createClient()

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (authError || !user?.id) {
		console.error('Authentication error:', authError)
		return []
	}

	const { data, error } = await supabase
		.from('liked_tracks')
		.select('*, tracks(*)')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false })

	if (error) {
		console.error(error)

		return []
	}

	if (!data) return []

	return data as unknown as Track[]
}

export const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
	const supabase = await createClient()

	const { data, error } = await supabase
		.from('products')
		.select('*, prices(*)')
		.eq('active', true)
		.eq('prices.active', true)
		.order('metadata->index')
		.order('unit_amount', { referencedTable: 'prices' })

	if (error) {
		console.error('DB error:', error)

		return []
	}

	// Type assertion with validation
	if (!data) return []

	return data as ProductWithPrice[]
}
