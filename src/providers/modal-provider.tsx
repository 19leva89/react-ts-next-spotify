'use client'

import { useClient } from '@/hooks/use-client'
import { UploadModal } from '@/components/shared'

export const ModalProvider = () => {
	const { isMounted } = useClient()

	if (!isMounted) return null

	return (
		<>
			<UploadModal />
		</>
	)
}
