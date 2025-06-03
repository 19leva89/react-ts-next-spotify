import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface Props {
	icon: LucideIcon
	label: string
	active?: boolean
	href: string
}

export const SidebarItem = ({ icon: Icon, label, active, href }: Props) => {
	return (
		<Link
			href={href}
			className={cn(
				`text-md flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 font-medium text-neutral-400 transition hover:text-white`,
				active && 'text-white',
			)}
		>
			<Icon size={28} className='size-7' />

			<p className='w-full truncate'>{label}</p>
		</Link>
	)
}
