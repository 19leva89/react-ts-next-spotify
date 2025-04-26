'use client'

import { SupabaseClient } from '@supabase/supabase-js'
import { createContext, PropsWithChildren } from 'react'

import { createClient } from '@/utils/supabase/client'

const SupabaseContext = createContext<SupabaseClient | null>(null)

export const SupabaseProvider = ({ children }: PropsWithChildren) => {
	const supabase = createClient()

	return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
}
