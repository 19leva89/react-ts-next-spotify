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
			<DialogContent className="drop-shadow-md border-neutral-700 bg-neutral-800">
				<DialogTitle className="text-xl text-center font-bold text-white">{title}</DialogTitle>

				<DialogDescription className="leading-normal text-center text-white">{description}</DialogDescription>

				<div>{children}</div>
			</DialogContent>
		</Dialog>
	)
}
