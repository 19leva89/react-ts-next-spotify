'use client'

import Image from 'next/image'
import { useState } from 'react'
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui'
import { Track } from '@/app/types'
import { usePlayer } from '@/hooks/use-player'
import { DeleteTrack, EditTrack, PlayButton } from '@/components/shared'

interface Props {
	data: Track
}

export const TrackCard = ({ data }: Props) => {
	const setTrack = usePlayer((state) => state.setTrack)

	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)

	return (
		<Card className="relative group overflow-hidden p-2 m-3 transition bg-neutral-400/5 border-none hover:bg-neutral-400/10">
			<CardHeader className="relative p-0">
				<div className="w-full aspect-square rounded-lg overflow-hidden">
					<Image
						src={data.coverImage || '/img/no-cover-image.png'}
						alt="Album Artwork"
						fill
						className="object-cover"
					/>

					{/* Dropdown Menu Button */}
					<div className="absolute top-2 right-2 z-10">
						<DropdownMenu>
							<DropdownMenuTrigger asChild className="cursor-pointer">
								<Button variant="secondary" size="icon" className="p-1 bg-neutral-900/5">
									<EllipsisVerticalIcon className="size-4" />
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent side="right" align="start" className="rounded-xl">
								<DropdownMenuItem onSelect={() => setIsDialogOpen(true)} className="cursor-pointer">
									<PencilIcon className="size-4 mr-2" />
									Edit
								</DropdownMenuItem>

								<DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)} className="cursor-pointer">
									<TrashIcon className="size-4 mr-2" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardHeader>

			<CardContent className="p-2 space-y-1">
				<CardTitle className="text-base text-white truncate">{data.title}</CardTitle>

				<CardDescription className="truncate text-sm">By {data.artist}</CardDescription>
			</CardContent>

			<CardFooter className="absolute bottom-5 right-0 z-10">
				<PlayButton onClick={() => setTrack(data)} />
			</CardFooter>

			{/* Edit Dialog */}
			<EditTrack track={data} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

			{/* Delete Dialog */}
			<DeleteTrack track={data} isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} />
		</Card>
	)
}
