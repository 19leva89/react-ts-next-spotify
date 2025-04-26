'use client'

import WaveSurfer from 'wavesurfer.js'
import { useEffect, useRef, useState } from 'react'
import { SquareIcon, PlayIcon, SkipForwardIcon, SkipBackIcon, PauseIcon } from 'lucide-react'

import { Button } from '@/components/ui'

interface Props {
	audioUrl: string
}

export const Wavesurfer = ({ audioUrl }: Props) => {
	const waveformRef = useRef<HTMLDivElement>(null)

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)

	useEffect(() => {
		if (!waveformRef.current) return

		const ws = WaveSurfer.create({
			container: waveformRef.current,
			waveColor: '#34374B',
			progressColor: '#F90',
			url: audioUrl,
			dragToSeek: true,
			hideScrollbar: true,
			normalize: true,
			barGap: 1,
			height: 60,
			barHeight: 20,
			barRadius: 20,
			barWidth: 5,
		})

		ws.on('ready', () => {})
		ws.on('finish', () => {})

		setWavesurfer(ws)

		return () => {
			ws.destroy()
		}
	}, [audioUrl])

	const handlePlayPause = () => {
		if (wavesurfer) {
			wavesurfer.playPause()
			setIsPlaying(!isPlaying)
		}
	}

	const handleStop = () => {
		if (wavesurfer) {
			wavesurfer.stop()
			setIsPlaying(false)
		}
	}

	const handleSkipForward = () => {
		if (wavesurfer) {
			wavesurfer.skip(2)
		}
	}

	const handleSkipBack = () => {
		if (wavesurfer) {
			wavesurfer.skip(-2)
		}
	}

	return (
		<div className="flex flex-col w-screen items-center rounded-xl">
			<div ref={waveformRef} className="w-3/4 mb-2" />

			<div className="flex gap-4">
				<Button variant="ghost" size="icon" onClick={handleSkipBack} className="text-white">
					<SkipBackIcon className="size-6" />
				</Button>

				<Button variant="ghost" size="icon" onClick={handlePlayPause} className="bg-[#f90] text-white">
					{isPlaying ? <PauseIcon className="size-6" /> : <PlayIcon className="size-6" />}
				</Button>

				<Button variant="ghost" size="icon" onClick={handleStop} className="text-white">
					<SquareIcon className="size-6" />
				</Button>

				<Button variant="ghost" size="icon" onClick={handleSkipForward} className="text-white">
					<SkipForwardIcon className="size-6" />
				</Button>
			</div>
		</div>
	)
}
