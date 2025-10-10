import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Figtree } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { Toaster } from '@/components/ui'
import { Player, Sidebar } from '@/components/shared'
import { ModalProvider, SupabaseProvider, UserProvider } from '@/providers'
import { getActiveProductsWithPrices, getTracksByUserId } from '@/app/actions'

import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Spotify',
	description: 'Listen to music anywhere',
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: PropsWithChildren) {
	const userTracks = await getTracksByUserId()
	const products = await getActiveProductsWithPrices()

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={font.className}>
				<SupabaseProvider>
					<UserProvider>
						<ModalProvider products={products} />

						<Sidebar tracks={userTracks}>{children}</Sidebar>

						<Player />
					</UserProvider>
				</SupabaseProvider>

				<Toaster position='bottom-right' expand={false} richColors />

				{/* Allow track page views for Vercel */}
				<Analytics />
			</body>
		</html>
	)
}
