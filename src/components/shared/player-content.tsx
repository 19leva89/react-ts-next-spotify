'use client'

import useSound from 'use-sound'
import { useEffect, useState } from 'react'
import { PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, Volume2Icon, VolumeXIcon } from 'lucide-react'

import { Track } from '@/app/types'
import { Slider } from '@/components/ui'
import { usePlayer } from '@/hooks/use-player'
import { LikeButton, MediaItem } from '@/components/shared'

interface Props {
	track: Track
	trackUrl: string
}

export const PlayerContent = ({ track, trackUrl }: Props) => {
	const player = usePlayer()

	const [volume, setVolume] = useState<number>(0.1)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)

	const Icon = isPlaying ? PauseIcon : PlayIcon
	const VolumeIcon = volume === 0 ? VolumeXIcon : Volume2Icon

	const onPlayNext = () => {
		if (player.ids.length === 0) return

		const currentIndex = player.ids.findIndex((id) => id === player.activeId)
		const nextTrack = player.ids[currentIndex + 1]

		if (!nextTrack) return player.setId(player.ids[0])

		player.setId(nextTrack)
	}

	const onPlayPrevious = () => {
		if (player.ids.length === 0) return

		const currentIndex = player.ids.findIndex((id) => id === player.activeId)
		const previousTrack = player.ids[currentIndex - 1]

		if (!previousTrack) return player.setId(player.ids[player.ids.length - 1])

		player.setId(previousTrack)
	}

	const [play, { pause, sound }] = useSound(trackUrl, {
		volume: volume,
		onplay: () => setIsPlaying(true),
		onend: () => {
			setIsPlaying(false)
			onPlayNext()
		},
		onpause: () => setIsPlaying(false),
		format: ['mp3'],
	})

	useEffect(() => {
		sound?.play()

		return () => {
			sound?.unload()
		}
	}, [sound])

	const handlePlay = () => {
		if (!isPlaying) play()
		else pause()
	}

	const toggleMute = () => {
		setVolume(volume === 0 ? 1 : 0)
	}

	const handleVolumeChange = (value: number[]) => {
		setVolume(value[0])
	}

	return (
		<div className='grid h-full grid-cols-2 md:grid-cols-3'>
			<div className='flex w-full justify-start'>
				<div className='flex items-center gap-x-4'>
					<MediaItem data={track} />

					<LikeButton trackId={track.id} />
				</div>
			</div>

			<div className='col-auto flex w-full items-center justify-end md:hidden'>
				<div
					onClick={handlePlay}
					className='flex size-10 cursor-pointer items-center justify-center rounded-full bg-white p-1'
				>
					<Icon size={30} className='text-black' />
				</div>
			</div>

			<div className='hidden size-full max-w-180 items-center justify-center gap-x-6 md:flex'>
				<SkipBackIcon
					size={30}
					onClick={onPlayPrevious}
					className='cursor-pointer text-neutral-400 transition hover:text-white'
				/>

				<div
					onClick={handlePlay}
					className='flex size-10 cursor-pointer items-center justify-center rounded-full bg-white p-1'
				>
					<Icon size={30} className='text-black' />
				</div>

				<SkipForwardIcon
					size={30}
					onClick={onPlayNext}
					className='cursor-pointer text-neutral-400 transition hover:text-white'
				/>
			</div>

			<div className='hidden w-full justify-end pr-2 md:flex'>
				<div className='flex w-30 items-center gap-x-2'>
					<VolumeIcon size={34} onClick={toggleMute} className='cursor-pointer text-white' />

					<Slider
						value={[volume]}
						onValueChange={handleVolumeChange}
						max={1}
						step={0.1}
						className='cursor-pointer bg-black'
					/>
				</div>
			</div>
		</div>
	)
}
