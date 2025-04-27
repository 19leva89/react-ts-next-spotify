import { getTracks } from '@/app/actions'
import { Header, ListItem } from '@/components/shared'
import { PageContent } from '@/app/(site)/_components/page-content'

export const dynamic = 'force-dynamic'

const HomePage = async () => {
	const tracks = await getTracks()

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

			<PageContent tracks={tracks} />
		</div>
	)
}

export default HomePage
