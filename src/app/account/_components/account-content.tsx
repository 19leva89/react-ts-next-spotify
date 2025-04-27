'use client'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui'
import { postData } from '@/lib/helpers'
import { useUser } from '@/hooks/use-user'
import { useSubscribeModal } from '@/hooks/use-subscribe-modal'

export const AccountContent = () => {
	const router = useRouter()
	const subscribeModal = useSubscribeModal()

	const { isLoading, subscription, user } = useUser()

	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (!isLoading && !user) router.replace('/')
	}, [isLoading, user, router])

	const redirectToCustomerPortal = async () => {
		setLoading(true)

		try {
			const { url, error } = await postData({
				url: '/api/create-portal-link',
			})
			window.location.assign(url)
		} catch (error) {
			console.error(error)

			toast.error((error as Error).message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mb-7 px-6">
			{!subscription && (
				<div className="flex flex-col items-center gap-y-4">
					<p className="text-white text-center">No active plan</p>

					<Button
						onClick={subscribeModal.onOpen}
						className="w-75 rounded-full bg-green-500 hover:bg-neutral-500 text-black hover:text-white transition ease-in-out duration-300"
					>
						Subscribe
					</Button>
				</div>
			)}

			{subscription && (
				<div className="flex flex-col items-center gap-y-4">
					<p className="text-white text-center">
						You are currently on the <b>{subscription?.prices?.products?.name}</b> plan
					</p>

					<Button
						disabled={loading || isLoading}
						onClick={redirectToCustomerPortal}
						className="w-75 rounded-full bg-green-500 hover:bg-neutral-500 text-black hover:text-white transition ease-in-out duration-300"
					>
						Open customer portal
					</Button>
				</div>
			)}
		</div>
	)
}
