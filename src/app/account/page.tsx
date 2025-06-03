import { Header } from '@/components/shared'
import { AccountContent } from './_components/account-content'

const AccountPage = () => {
	return (
		<div className='size-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
			<Header className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1 className='text-3xl font-semibold text-white'>Account settings</h1>
				</div>
			</Header>

			<AccountContent />
		</div>
	)
}

export default AccountPage
