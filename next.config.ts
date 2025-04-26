import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
		],
		unoptimized: true,
	},
	reactStrictMode: false,
}

export default nextConfig
