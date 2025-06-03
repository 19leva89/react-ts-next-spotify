'use client'

import { ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HouseIcon, SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Track } from '@/app/types'
import { usePlayer } from '@/hooks/use-player'
import { Box, Library, SidebarItem } from '@/components/shared'

interface Props {
	children: ReactNode
	tracks: Track[]
}

export const Sidebar = ({ children, tracks }: Props) => {
	const player = usePlayer()
	const pathname = usePathname()

	const routes = useMemo(
		() => [
			{
				icon: HouseIcon,
				label: 'Home',
				active: pathname !== '/search',
				href: '/',
			},
			{
				icon: SearchIcon,
				label: 'Search',
				active: pathname === '/search',
				href: '/search',
			},
		],
		[pathname],
	)

	return (
		<div className={cn('flex h-full', player.activeId && 'h-[calc(100%-80px)]')}>
			<div className='hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex'>
				<Box>
					<div className='flex flex-col gap-y-4 px-5 py-4'>
						{routes.map((route) => (
							<SidebarItem key={route.label} {...route} />
						))}
					</div>
				</Box>

				<Box className='h-full overflow-y-auto'>
					<Library tracks={tracks} />
				</Box>
			</div>

			<main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
		</div>
	)
}
