'use client'

import { BounceLoader } from 'react-spinners'

import { Box } from '@/components/shared'

const LoadingPage = () => {
	return (
		<Box className='flex h-full items-center justify-center'>
			<BounceLoader color='#22c55e' size={40} />
		</Box>
	)
}

export default LoadingPage
