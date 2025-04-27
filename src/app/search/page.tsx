import { getTracksByTitle } from '@/app/actions'
import { Header, SearchInput } from '@/components/shared'
import { SearchContent } from '@/app/search/_components/search-content'

interface Props {
	searchParams: Promise<{ title: string }>
}

export const dynamic = 'force-dynamic'

const SearchPage = async ({ searchParams }: Props) => {
	const tracks = await getTracksByTitle((await searchParams).title)

	return (
		<div className="size-full rounded-lg bg-neutral-900 overflow-hidden overflow-y-auto">
			<Header className="from-bg-neutral-900">
				<div className="flex flex-col gap-y-6 mb-2">
					<h1 className="text-white text-3xl font-semibold">Search</h1>

					<SearchInput />
				</div>
			</Header>

			<SearchContent tracks={tracks} />
		</div>
	)
}

export default SearchPage
