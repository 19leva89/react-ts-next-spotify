'use client'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui'
import { Track } from '@/app/types'
import { usePlayer } from '@/hooks/use-player'
import { updateTrackById } from '@/app/actions'
import { AudioUpload } from '@/components/shared'
import { useGetGenres } from '@/hooks/use-get-genres'

interface Props {
	track: Track
	isOpen: boolean
	onClose: () => void
}

export const EditTrack = ({ track, isOpen, onClose }: Props) => {
	const player = usePlayer()
	const router = useRouter()

	const { genres: availableGenres } = useGetGenres()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	const [selectedGenreId, setSelectedGenreId] = useState<string>('')

	const { register, handleSubmit, setValue } = useForm<FieldValues>({
		defaultValues: {
			title: track.title || '',
			artist: track.artist || '',
			album: track.album || '',
			coverImage: track.coverImage || '',
			genres: track.genres || [],
			audioFile: track.audioFile || '',
		},
	})

	useEffect(() => {
		if (availableGenres.length > 0 && track.genres) {
			const matched = track.genres.filter((genre) => availableGenres.includes(genre))

			setSelectedGenres(matched)
			setValue('genres', matched)
		}
	}, [availableGenres, track.genres, setValue])

	const isValidImageUrl = async (url: string): Promise<boolean> => {
		if (!url) return true

		return new Promise((resolve) => {
			const img = new Image()
			img.onload = () => resolve(true)
			img.onerror = () => resolve(false)
			img.src = url
		})
	}

	const onValid: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true)

			const isImageOk = await isValidImageUrl(values.coverImage)
			if (!isImageOk) {
				toast.error('Invalid image URL')

				setIsLoading(false)
				return
			}

			await updateTrackById(track.id, {
				title: values.title,
				artist: values.artist,
				album: values.album,
				genres: selectedGenres,
				coverImage: values.coverImage,
			})

			toast.success('Track updated!')
			onClose()
			player.clearTrack()
			router.refresh()
		} catch (err: any) {
			toast.error(err.message || 'Something went wrong')
		} finally {
			setIsLoading(false)
		}
	}

	const onInvalid = (errors: any) => {
		if (errors.title) toast.error('Title is required')

		if (errors.artist) toast.error('Artist is required')

		if (errors.coverImage) toast.error(errors.coverImage.message)
	}

	const handleAddGenre = (genre: string) => {
		if (selectedGenres.includes(genre)) return
		const updated = [...selectedGenres, genre]

		setSelectedGenres(updated)
		setSelectedGenreId('')
		setValue('genres', updated)
	}

	const removeGenre = (genre: string) => {
		const updated = selectedGenres.filter((g) => g !== genre)

		setSelectedGenres(updated)
		setValue('genres', updated)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="rounded-xl sm:max-w-2xl max-[450px]:px-1">
				<DialogHeader className="px-4">
					<DialogTitle>Edit track</DialogTitle>

					<DialogDescription>Update values of {track.title} in your library</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(onValid, onInvalid)} className="flex flex-col gap-y-4">
					<Input
						id="title"
						placeholder="Title"
						disabled={isLoading}
						{...register('title', { required: true })}
					/>

					<Input
						id="artist"
						placeholder="Artist"
						disabled={isLoading}
						{...register('artist', { required: true })}
					/>

					<Input id="album" placeholder="Album (optional)" disabled={isLoading} {...register('album')} />

					<Input
						id="coverImage"
						placeholder="Cover image URL (optional)"
						disabled={isLoading}
						{...register('coverImage')}
					/>

					{/* Genre Input */}
					<div className="flex items-center gap-2">
						<Select
							value={selectedGenreId}
							onValueChange={(value) => {
								setSelectedGenreId(value)
								handleAddGenre(value)
							}}
							disabled={isLoading}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select genre (optional)" />
							</SelectTrigger>

							<SelectContent>
								{availableGenres
									.filter((g) => !selectedGenres.includes(g))
									.map((genre) => (
										<SelectItem key={genre} value={genre}>
											{genre}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-wrap gap-2">
						{selectedGenres.map((genre) => (
							<div key={genre} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
								<span>{genre}</span>

								<button
									type="button"
									onClick={() => removeGenre(genre)}
									className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
								>
									×
								</button>
							</div>
						))}
					</div>

					{/* Audio File Upload */}
					<AudioUpload trackId={track.id} initialAudioUrl={track.audioFile} disabled={isLoading} />

					<Button variant="default" size="lg" disabled={isLoading} type="submit" className="cursor-pointer">
						Save changes
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
