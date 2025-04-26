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
				`flex flex-row items-center gap-x-4 w-full h-auto py-1 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400`,
				active && 'text-white',
			)}
		>
			<Icon size={28} className="size-7" />

			<p className="w-full truncate">{label}</p>
		</Link>
	)
}
