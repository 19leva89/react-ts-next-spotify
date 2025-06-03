import { ReactNode } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui'

interface Props {
	title: string
	description: string
	isOpen: boolean
	children: ReactNode
	onChange: (open: boolean) => void
}

export const Modal = ({ title, description, isOpen, children, onChange }: Props) => {
	return (
		<Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
			<DialogContent className='border-neutral-700 bg-neutral-800 drop-shadow-md'>
				<DialogTitle className='text-center text-xl font-bold text-white'>{title}</DialogTitle>

				<DialogDescription className='text-center leading-normal text-white'>{description}</DialogDescription>

				<div>{children}</div>
			</DialogContent>
		</Dialog>
	)
}
