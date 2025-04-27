'use client'

import { toast } from 'sonner'
import { useState } from 'react'

import { Button } from '@/components/ui'
import { postData } from '@/lib/helpers'
import { useUser } from '@/hooks/use-user'
import { getStripe } from '@/lib/stripe-client'
import { Modal } from '@/components/shared/modals'
import { Price, ProductWithPrice } from '@/app/types'
import { useSubscribeModal } from '@/hooks/use-subscribe-modal'

interface Props {
	products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
	const priceString = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: price.currency,
		minimumFractionDigits: 0,
	}).format((price.unit_amount || 0) / 100)

	return priceString
}

export const SubscribeModal = ({ products }: Props) => {
	const subscribeModal = useSubscribeModal()

	const { user, subscription, isLoading } = useUser()

	const [priceIdLoading, setPriceIdLoading] = useState<string>()

	const onChange = (open: boolean) => {
		if (!open) subscribeModal.onClose()
	}

	const handleCheckout = async (price: Price) => {
		setPriceIdLoading(price.id)

		if (!user) {
			setPriceIdLoading(undefined)
			return toast.error('Must be Logged In to subscribe')
		}

		if (subscription) {
			setPriceIdLoading(undefined)
			return toast('Already subscribed')
		}

		try {
			const { sessionId } = await postData({
				url: '/api/create-checkout-session',
				data: { price },
			})

			const stripe = await getStripe()
			stripe?.redirectToCheckout({ sessionId })
		} catch (error) {
			console.error(error)

			toast.error((error as Error)?.message)
		} finally {
			setPriceIdLoading(undefined)
		}
	}

	let content = <div className="text-center text-white">No products available</div>

	if (products.length) {
		content = (
			<div className="flex flex-col items-center justify-center gap-y-4">
				{products.map((product) => {
					if (!product.prices?.length) {
						return (
							<div key={product.id} className="text-center text-white">
								No prices available
							</div>
						)
					}

					return product.prices.map((price) => (
						<Button
							key={price.id}
							variant="secondary"
							size="lg"
							onClick={() => handleCheckout(price)}
							disabled={isLoading || price.id === priceIdLoading}
							className="rounded-full bg-green-500 hover:bg-neutral-500 hover:text-white transition ease-in-out duration-300"
						>
							{`Subscribe for ${formatPrice(price)} a ${price.interval}`}
						</Button>
					))
				})}
			</div>
		)
	}

	if (subscription) {
		content = <div className="text-center">Already subscribed</div>
	}

	return (
		<Modal
			title="Only for Premium user"
			description="Listen to Music with Spotify Premium"
			isOpen={subscribeModal.isOpen}
			onChange={onChange}
		>
			{content}
		</Modal>
	)
}
