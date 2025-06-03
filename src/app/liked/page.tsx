import Image from 'next/image'

import { Header } from '@/components/shared'
import { getLikedTracks } from '@/app/actions'
import { LikedContent } from './_components/liked-content'

export const dynamic = 'force-dynamic'

const LikedPage = async () => {
	const tracks = await getLikedTracks()

	return (
		<div className='size-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
			<Header>
				<div className='mt-20'>
					<div className='flex flex-col items-center gap-x-5 md:flex-row'>
						<div className='relative size-24 lg:size-32'>
							<Image src='/img/liked.png' alt='Liked Playlist' fill className='object-cover' />
						</div>

						<div className='mt-4 flex flex-col gap-y-2 md:mt-0'>
							<p className='hidden text-sm font-semibold text-white md:block'>Playlist</p>

							<h1 className='text-4xl font-bold text-white sm:text-5xl lg:text-7xl'>Liked tracks</h1>
						</div>
					</div>
				</div>
			</Header>

			<LikedContent tracks={tracks} />
		</div>
	)
}

export default LikedPage
