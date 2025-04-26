'use client'

import { useEffect, useState } from 'react'

import { UploadModal } from '@/components/shared'

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<>
			<UploadModal />
		</>
	)
}
