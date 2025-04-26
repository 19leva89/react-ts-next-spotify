import { getAllTracks } from '@/app/actions'
import { Header, ListItem, PaginationClient } from '@/components/shared'
import { TrackFilters, TrackListWrapper } from '@/app/(site)/_components'

export const revalidate = 0

type Props = {
	searchParams: Promise<{
		page?: string
		sort?: string
		order?: 'asc' | 'desc'
		search?: string
		genre?: string
		artist?: string
	}>
}

const HomePage = async ({ searchParams }: Props) => {
	const params = await searchParams

	const currentPage = Number(params?.page || 1)
	const sortField = params?.sort || 'createdAt'
	const sortOrder = params?.order || 'desc'
	const searchQuery = params?.search || ''
	const sortGenre = params?.genre || ''
	const sortArtist = params?.artist || ''

	// const { data: tracks, meta } = await getAllTracks({
	// 	page: currentPage,
	// 	limit: 16,
	// 	sort: sortField,
	// 	order: sortOrder,
	// 	search: searchQuery,
	// 	genre: sortGenre,
	// 	artist: sortArtist,
	// })

	return (
		<div className="size-full rounded-lg bg-neutral-900 overflow-hidden overflow-y-auto">
			<Header>
				<div className="mb-2">
					<h1 className="text-white text-3xl font-semibold">Welcome back</h1>

					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
						<ListItem href="liked" image="/img/liked.png" name="Liked tracks" />
					</div>
				</div>
			</Header>

			<div className="mt-2 mb-7 px-6">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<h2 className="text-white text-2xl font-semibold">Newest tracks</h2>
				</div>
			</div>

			<TrackListWrapper tracks={[]} />
		</div>
	)
}

export default HomePage
