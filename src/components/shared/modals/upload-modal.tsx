'use client'

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
			const trackFile = values.track?.[0]

			if (!imageFile || !trackFile || !user) {
				toast.error('Missing fields')

				return
			}

			const uniqueId = Math.random().toString(36).substring(2, 10)

			// Upload Track
			const { data: trackData, error: trackError } = await supabase.storage
				.from('tracks')
				.upload(`track-${values.title}-${uniqueId}`, trackFile, {
					cacheControl: '3600',
					upsert: false,
				})

			if (trackError) {
				setIsLoading(false)
				return toast.error('Track upload failed')
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
				return toast.error('Image upload failed')
			}

			const { error: supabaseError } = await supabase.from('tracks').insert({
				user_id: user.id,
				title: values.title,
				author: values.author,
				image_path: imageData.path,
				track_path: trackData.path,
			})

			if (supabaseError) {
				setIsLoading(false)
				return toast.error(supabaseError.message)
			}

			router.refresh()
			setIsLoading(false)
			toast.success('Track created!')
			reset()
			uploadModal.onClose()
		} catch {
			toast.error('Something went wrong')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Modal
			title='Add a track'
			description='Upload an mp3 file'
			isOpen={uploadModal.isOpen}
			onChange={onChange}
		>
			<form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
				<Input
					id='title'
					disabled={isLoading}
					placeholder='Track title'
					className='border-neutral-700 bg-neutral-700 text-white placeholder:text-neutral-400'
					{...register('title', { required: true })}
				/>

				<Input
					id='author'
					disabled={isLoading}
					placeholder='Track author'
					className='border-neutral-700 bg-neutral-700 text-white placeholder:text-neutral-400'
					{...register('author', { required: true })}
				/>

				<div>
					<div className='pb-1 text-white'>Select a track file</div>

					<Input
						id='track'
						type='file'
						disabled={isLoading}
						accept='.mp3'
						className='border-neutral-700 bg-neutral-700 text-neutral-400 file:text-neutral-400'
						{...register('track', { required: true })}
					/>
				</div>

				<div>
					<div className='pb-1 text-white'>Select an image</div>

					<Input
						id='image'
						type='file'
						disabled={isLoading}
						accept='image/*'
						className='border-neutral-700 bg-neutral-700 text-neutral-400 file:text-neutral-400'
						{...register('image', { required: true })}
					/>
				</div>

				<Button
					variant='secondary'
					disabled={isLoading}
					type='submit'
					className='bg-green-500 transition duration-300 ease-in-out hover:bg-neutral-500 hover:text-white'
				>
					Create
				</Button>
			</form>
		</Modal>
	)
}
