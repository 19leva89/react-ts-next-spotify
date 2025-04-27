'use client'

import { toast } from 'sonner'
import { ReactNode } from 'react'
import { UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ChevronLeftIcon, ChevronRightIcon, HouseIcon, SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { useUser } from '@/hooks/use-user'
import { useAuthModal } from '@/hooks/use-auth-modal'

interface Props {
	children: ReactNode
	className?: string
}

export const Header = ({ children, className }: Props) => {
	const router = useRouter()
	const supabase = createClient()
	const authModal = useAuthModal()

	const { user, subscription } = useUser()

	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut()

			if (error) {
				toast.error(error.message)

				return
			}

			router.refresh()

			toast.success('Logged out successfully!')
		} catch (err) {
			toast.error('Failed to logout')

			console.error('Logout error:', err)
		}
	}

	return (
		<div className={cn('h-fit p-6 bg-gradient-to-b from-emerald-800', className)}>
			<div className="flex items-center justify-between w-full mb-4">
				<div className="hidden md:flex items-center gap-x-2">
					<Button
						variant="default"
						size="icon"
						onClick={() => router.back()}
						className="rounded-full bg-black cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
					>
						<ChevronLeftIcon size={35} className="size-6 text-white" />
					</Button>

					<Button
						variant="default"
						size="icon"
						onClick={() => router.forward()}
						className="rounded-full bg-black cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
					>
						<ChevronRightIcon size={35} className="size-6 text-white" />
					</Button>
				</div>

				<div className="flex items-center gap-x-2 md:hidden">
					<Button
						variant="secondary"
						size="icon"
						className="rounded-full bg-white cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
					>
						<HouseIcon size={20} className="size-5 text-black" />
					</Button>

					<Button
						variant="secondary"
						size="icon"
						className="rounded-full bg-white cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
					>
						<SearchIcon size={20} className="size-5 text-black" />
					</Button>
				</div>

				<div className="flex items-center justify-between gap-x-4">
					{user ? (
						<>
							<Button
								variant="outline"
								size="lg"
								onClick={handleLogout}
								className="rounded-full cursor-pointer transition ease-in-out duration-300"
							>
								Logout
							</Button>

							<Button
								variant="outline"
								size="lg"
								onClick={() => router.push('/account')}
								className="rounded-full cursor-pointer transition ease-in-out duration-300"
							>
								<UserIcon />
							</Button>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								size="lg"
								onClick={authModal.onOpen}
								className="rounded-full text-white cursor-pointer transition ease-in-out duration-300"
							>
								Sign Up
							</Button>

							<Button
								variant="outline"
								size="lg"
								onClick={authModal.onOpen}
								className="rounded-full cursor-pointer transition ease-in-out duration-300"
							>
								Log In
							</Button>
						</>
					)}
				</div>
			</div>

			{children}
		</div>
	)
}
