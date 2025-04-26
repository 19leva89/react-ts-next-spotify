import { User } from '@supabase/supabase-js'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'
import { Subscription, UserDetails } from '@/app/types'

type UserContextType = {
	accessToken: string | null
	user: User | null
	userDetails: UserDetails | null
	isLoading: boolean
	subscription: Subscription | null
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const supabase = createClient()

	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [accessToken, setAccessToken] = useState<string | null>(null)
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
	const [subscription, setSubscription] = useState<Subscription | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser()

			if (error) {
				setUser(null)
				setAccessToken(null)
			} else {
				setUser(user)
				const session = await supabase.auth.getSession()
				setAccessToken(session.data.session?.access_token ?? null)
			}

			setIsLoading(false)
		}

		fetchUser()
	}, [supabase])

	useEffect(() => {
		const fetchUserData = async () => {
			if (user) {
				const { data: userDetails } = await supabase.from('users').select('*').single()

				const { data: subscription } = await supabase
					.from('subscriptions')
					.select('*, prices(*, products(*))')
					.in('status', ['trialing', 'active'])
					.single()

				setUserDetails(userDetails as unknown as UserDetails)
				setSubscription(subscription as Subscription)
			} else {
				setUserDetails(null)
				setSubscription(null)
			}
		}

		fetchUserData()
	}, [user, supabase])

	return (
		<UserContext.Provider
			value={{
				accessToken,
				user,
				userDetails,
				isLoading,
				subscription,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
	const context = useContext(UserContext)

	if (context === undefined) throw new Error('useUserContext must be used within a UserContextProvider')

	return context
}
