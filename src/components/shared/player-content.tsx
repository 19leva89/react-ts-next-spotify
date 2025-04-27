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
		<div className="grid grid-cols-2 md:grid-cols-3 h-full">
			<div className="flex justify-start w-full">
				<div className="flex items-center gap-x-4">
					<MediaItem data={track} />

					<LikeButton trackId={track.id} />
				</div>
			</div>

			<div className="flex md:hidden col-auto items-center justify-end w-full">
				<div
					onClick={handlePlay}
					className="flex items-center justify-center size-10 p-1 rounded-full bg-white cursor-pointer"
				>
					<Icon size={30} className="text-black" />
				</div>
			</div>

			<div className="hidden md:flex items-center justify-center gap-x-6 size-full max-w-180">
				<SkipBackIcon
					size={30}
					onClick={onPlayPrevious}
					className="text-neutral-400 cursor-pointer hover:text-white transition"
				/>

				<div
					onClick={handlePlay}
					className="flex items-center justify-center size-10 p-1 rounded-full bg-white cursor-pointer"
				>
					<Icon size={30} className="text-black" />
				</div>

				<SkipForwardIcon
					size={30}
					onClick={onPlayNext}
					className="text-neutral-400 cursor-pointer hover:text-white transition"
				/>
			</div>

			<div className="hidden md:flex justify-end w-full pr-2">
				<div className="flex items-center gap-x-2 w-30">
					<VolumeIcon size={34} onClick={toggleMute} className="text-white cursor-pointer" />

					<Slider
						value={[volume]}
						onValueChange={handleVolumeChange}
						max={1}
						step={0.1}
						className="bg-black cursor-pointer"
					/>
				</div>
			</div>
		</div>
	)
}
