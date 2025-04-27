'use client'

import { ProductWithPrice } from '@/app/types'
import { useClient } from '@/hooks/use-client'
import { AuthModal, SubscribeModal, UploadModal } from '@/components/shared/modals'

interface Props {
	products: ProductWithPrice[]
}

export const ModalProvider = ({ products }: Props) => {
	const { isMounted } = useClient()

	if (!isMounted) return null

	return (
		<>
			<AuthModal />

			<UploadModal />

			<SubscribeModal products={products} />
		</>
	)
}
