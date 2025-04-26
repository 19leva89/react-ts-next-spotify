'use client'

import uniqid from 'uniqid'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { useUser } from '@/hooks/use-user'
import { Button, Input } from '@/components/ui'
import { Modal } from '@/components/shared/modals'
import { useUploadModal } from '@/hooks/use-upload-modal'

export const UploadModal = () => {
	const router = useRouter()
	const supabase = createClient()
	const uploadModal = useUploadModal()

	const { user } = useUser()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { register, handleSubmit, reset } = useForm<FieldValues>({
		defaultValues: {
			author: '',
			title: '',
			track: null,
			image: null,
		},
	})

	const onChange = (open: boolean) => {
		if (!open) {
			reset()
			uploadModal.onClose()
		}
	}

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true)

			const imageFile = values.image?.[0]
			const songFile = values.track?.[0]

			if (!imageFile || !songFile || !user) {
				toast.error('Missing Fields.')

				return
			}

			const uniqueId = uniqid()

			// Upload Track
			const { data: songData, error: songError } = await supabase.storage
				.from('tracks')
				.upload(`track-${values.title}-${uniqueId}`, songFile, {
					cacheControl: '3600',
					upsert: false,
				})

			if (songError) {
				setIsLoading(false)
				return toast.error('Track Upload Failed.')
			}

			// Upload Image
			const { data: imageData, error: imageError } = await supabase.storage
				.from('images')
				.upload(`image-${values.title}-${uniqueId}`, imageFile, {
					cacheControl: '3600',
					upsert: false,
				})

			if (imageError) {
				setIsLoading(false)
				return toast.error('Image Upload Failed.')
			}

			const { error: supabaseError } = await supabase.from('tracks').insert({
				user_id: user.id,
				title: values.title,
				author: values.author,
				image_path: imageData.path,
				song_path: songData.path,
			})

			if (supabaseError) {
				setIsLoading(false)
				return toast.error(supabaseError.message)
			}

			router.refresh()
			setIsLoading(false)
			toast.success('Track Created!')
			reset()
			uploadModal.onClose()
		} catch (error) {
			toast.error('Something Went Wrong.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Modal
			title="Add a Track"
			description="Upload an MP3 File."
			isOpen={uploadModal.isOpen}
			onChange={onChange}
		>
			<form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
				<Input
					id="title"
					disabled={isLoading}
					placeholder="Track Title"
					{...register('title', { required: true })}
				/>
				<Input
					id="author"
					disabled={isLoading}
					placeholder="Author"
					{...register('author', { required: true })}
				/>
				<div>
					<div className="pb-1">Select a Track File.</div>
					<Input
						id="track"
						type="file"
						disabled={isLoading}
						accept=".mp3"
						{...register('track', { required: true })}
					/>
				</div>
				<div>
					<div className="pb-1">Select an Image.</div>
					<Input
						id="image"
						type="file"
						disabled={isLoading}
						accept="image/*"
						{...register('image', { required: true })}
					/>
				</div>
				<Button disabled={isLoading} type="submit">
					Create
				</Button>
			</form>
		</Modal>
	)
}
