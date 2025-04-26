import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Figtree } from 'next/font/google'

import { Toaster } from '@/components/ui'
// import { getAllTracks } from '@/app/actions'
import { Player, Sidebar } from '@/components/shared'
import { ModalProvider } from '@/components/shared/providers'

import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Spotify',
	description: 'Listen to music anywhere',
}

export const revalidate = 0

export default async function RootLayout({ children }: PropsWithChildren) {
	// const { data: tracks, meta } = await getAllTracks({
	// 	page: 1,
	// 	limit: 10,
	// 	sort: 'title',
	// 	order: 'asc',
	// })

	return (
		<html lang="en">
			<body className={font.className}>
				<Toaster position="bottom-right" expand={false} richColors />

				<ModalProvider />

				<Sidebar tracks={[]}>{children}</Sidebar>

				<Player />
			</body>
		</html>
	)
}
