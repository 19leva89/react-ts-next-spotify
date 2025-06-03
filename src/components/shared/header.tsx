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
import { usePlayer } from '@/hooks/use-player'
import { useAuthModal } from '@/hooks/use-auth-modal'

interface Props {
	children: ReactNode
	className?: string
}

export const Header = ({ children, className }: Props) => {
	const player = usePlayer()
	const router = useRouter()
	const supabase = createClient()
	const authModal = useAuthModal()

	const { user } = useUser()

	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut()

			if (error) {
				toast.error(error.message)

				return
			}

			player.reset()
			router.refresh()

			toast.success('Logged out successfully!')
		} catch (err) {
			toast.error('Failed to logout')

			console.error('Logout error:', err)
		}
	}

	return (
		<div className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}>
			<div className='mb-4 flex w-full items-center justify-between'>
				<div className='hidden items-center gap-x-2 md:flex'>
					<Button
						variant='default'
						size='icon'
						onClick={() => router.back()}
						className='cursor-pointer rounded-full bg-black transition duration-300 ease-in-out hover:opacity-75'
					>
						<ChevronLeftIcon size={35} className='size-6 text-white' />
					</Button>

					<Button
						variant='default'
						size='icon'
						onClick={() => router.forward()}
						className='cursor-pointer rounded-full bg-black transition duration-300 ease-in-out hover:opacity-75'
					>
						<ChevronRightIcon size={35} className='size-6 text-white' />
					</Button>
				</div>

				<div className='flex items-center gap-x-2 md:hidden'>
					<Button
						variant='secondary'
						size='icon'
						className='cursor-pointer rounded-full bg-white transition duration-300 ease-in-out hover:opacity-75'
					>
						<HouseIcon size={20} className='size-5 text-black' />
					</Button>

					<Button
						variant='secondary'
						size='icon'
						className='cursor-pointer rounded-full bg-white transition duration-300 ease-in-out hover:opacity-75'
					>
						<SearchIcon size={20} className='size-5 text-black' />
					</Button>
				</div>

				<div className='flex items-center justify-between gap-x-4'>
					{user ? (
						<>
							<Button
								variant='outline'
								size='lg'
								onClick={handleLogout}
								className='cursor-pointer rounded-full transition duration-300 ease-in-out'
							>
								Logout
							</Button>

							<Button
								variant='outline'
								size='lg'
								onClick={() => router.push('/account')}
								className='cursor-pointer rounded-full transition duration-300 ease-in-out'
							>
								<UserIcon />
							</Button>
						</>
					) : (
						<>
							<Button
								variant='ghost'
								size='lg'
								onClick={authModal.onOpen}
								className='cursor-pointer rounded-full text-white transition duration-300 ease-in-out'
							>
								Sign Up
							</Button>

							<Button
								variant='outline'
								size='lg'
								onClick={authModal.onOpen}
								className='cursor-pointer rounded-full transition duration-300 ease-in-out'
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
