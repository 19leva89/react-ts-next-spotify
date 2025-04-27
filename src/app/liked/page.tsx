import Image from 'next/image'

import { Header } from '@/components/shared'
import { getLikedTracks } from '@/app/actions'
import { LikedContent } from './_components/liked-content'

export const dynamic = 'force-dynamic'

const LikedPage = async () => {
	const tracks = await getLikedTracks()

	return (
		<div className="size-full rounded-lg bg-neutral-900 overflow-hidden overflow-y-auto">
			<Header>
				<div className="mt-20">
					<div className="flex flex-col md:flex-row items-center gap-x-5">
						<div className="relative size-24 lg:size-32">
							<Image src="/img/liked.png" alt="Liked Playlist" fill className="object-cover" />
						</div>

						<div className="flex flex-col gap-y-2 mt-4 md:mt-0">
							<p className="hidden md:block font-semibold text-sm text-white">Playlist</p>

							<h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">Liked tracks</h1>
						</div>
					</div>
				</div>
			</Header>

			<LikedContent tracks={tracks} />
		</div>
	)
}

export default LikedPage
