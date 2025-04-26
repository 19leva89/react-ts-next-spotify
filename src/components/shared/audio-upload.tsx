'use client'

import { toast } from 'sonner'
import { Trash2Icon, UploadIcon } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'

import { usePlayer } from '@/hooks/use-player'
import { Button, Input } from '@/components/ui'
import { BACKEND_API_URL } from '@/lib/constants'
import { deleteTrackFile, uploadTrackFile } from '@/app/actions'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
const ALLOWED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/x-wav']

interface Props {
	trackId: string
	initialAudioUrl?: string
	disabled?: boolean
}

export const AudioUpload = ({ trackId, initialAudioUrl, disabled }: Props) => {
	const player = usePlayer()

	const [audioUrl, setAudioUrl] = useState<string>('')
	const [audioFile, setAudioFile] = useState<File | null>(null)

	useEffect(() => {
		if (initialAudioUrl) {
			const fullUrl = `${BACKEND_API_URL}/files/${initialAudioUrl}`

			setAudioUrl(fullUrl)
		}
	}, [initialAudioUrl])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!ALLOWED_TYPES.includes(file.type)) {
			toast.error('Only MP3 or WAV files are allowed')

			return
		}

		if (file.size > MAX_FILE_SIZE) {
			toast.error('File size must be under 20MB')

			return
		}

		setAudioFile(file)
	}

	const handleUpload = async () => {
		if (!audioFile) return

		try {
			await uploadTrackFile(trackId, audioFile)

			setAudioUrl(URL.createObjectURL(audioFile))
			player.clearTrack()

			toast.success('Audio uploaded successfully!')
		} catch (error: any) {
			toast.error(error.message || 'Failed to upload audio')
		}
	}

	const handleRemoveAudio = async () => {
		try {
			await deleteTrackFile(trackId, audioFile!)

			setAudioFile(null)
			setAudioUrl('')
			player.clearTrack()

			toast.success('Audio removed successfully!')
		} catch (error: any) {
			toast.error(error.message || 'Failed to remove audio')
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="text-sm text-muted-foreground">Audio file</div>

			{audioUrl && (
				<div className="flex items-center gap-2">
					<audio controls src={audioUrl} className="w-full" />

					<Button variant="destructive" type="button" onClick={handleRemoveAudio} className="w-fit">
						<Trash2Icon className="size-4" />
					</Button>
				</div>
			)}

			{!audioUrl && (
				<div className="flex gap-2">
					<Input id="track" type="file" accept=".mp3, .wav" disabled={disabled} onChange={handleChange} />

					{audioFile && (
						<Button
							variant="outline"
							type="button"
							onClick={handleUpload}
							disabled={disabled}
							className="w-fit"
						>
							<UploadIcon className="size-4 mr-2" />
							Upload audio
						</Button>
					)}
				</div>
			)}
		</div>
	)
}
