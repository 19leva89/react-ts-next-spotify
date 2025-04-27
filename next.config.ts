import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'modlghxlwbydqemtomkb.supabase.co',
			},
		],
		unoptimized: true,
	},
	reactStrictMode: false,
}

export default nextConfig
