import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface Props {
	children: ReactNode
	className?: string
}

export const Box = ({ children, className }: Props) => {
	return <div className={cn('h-fit w-full rounded-lg bg-neutral-900', className)}>{children}</div>
}
