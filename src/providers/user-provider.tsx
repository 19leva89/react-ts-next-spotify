'use client'

import { PropsWithChildren } from 'react'

import { UserContextProvider } from '@/hooks/use-user'

export const UserProvider = ({ children }: PropsWithChildren) => {
	return <UserContextProvider>{children}</UserContextProvider>
}
