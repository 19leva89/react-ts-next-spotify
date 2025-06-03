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
		<div className='size-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
			<Header className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1 className='text-3xl font-semibold text-white'>Search</h1>

					<SearchInput />
				</div>
			</Header>

			<SearchContent tracks={tracks} />
		</div>
	)
}

export default SearchPage
