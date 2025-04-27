import { Header } from '@/components/shared'
import { AccountContent } from './_components/account-content'

const AccountPage = () => {
	return (
		<div className="size-full rounded-lg bg-neutral-900 overflow-hidden overflow-y-auto">
			<Header className="from-bg-neutral-900">
				<div className="flex flex-col gap-y-6 mb-2">
					<h1 className="text-white text-3xl font-semibold">Account settings</h1>
				</div>
			</Header>

			<AccountContent />
		</div>
	)
}

export default AccountPage
