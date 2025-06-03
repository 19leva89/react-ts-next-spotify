'use client'

import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useCallback, useEffect, useState } from 'react'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'

import { Modal } from '@/components/shared/modals'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { createClient } from '@/utils/supabase/client'

export const AuthModal = () => {
	const router = useRouter()
	const supabase = createClient()

	const { isOpen, onClose } = useAuthModal()

	const [session, setSession] = useState<Session | null>(null)

	const fetchSession = useCallback(async () => {
		try {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession()

			if (error) throw error
			setSession(session)
		} catch (error) {
			console.error('Error fetching session:', error)
		}
	}, [supabase.auth])

	useEffect(() => {
		fetchSession()

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [fetchSession, supabase.auth])

	useEffect(() => {
		if (session) {
			router.refresh()

			onClose()
		}
	}, [session, router, onClose])

	const onChange = useCallback(
		(open: boolean) => {
			if (!open) onClose()
		},
		[onClose],
	)

	return (
		<Modal title='Welcome back' description='Log in to your account' isOpen={isOpen} onChange={onChange}>
			<Auth
				theme='dark'
				providers={['github', 'google']}
				magicLink
				supabaseClient={supabase}
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: '#404040',
								brandAccent: '#22c55e',
							},
						},
					},
				}}
			/>
		</Modal>
	)
}
