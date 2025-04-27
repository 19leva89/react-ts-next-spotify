import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/helpers'
import { createClient } from '@/utils/supabase/server'
import { createOrRetrieveCustomer } from '@/utils/supabase/admin'

export async function POST() {
	try {
		const supabase = await createClient()

		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user) throw new Error('Could not get user')

		const customer = await createOrRetrieveCustomer({
			uuid: user.id || '',
			email: user.email || '',
		})

		if (!customer) throw new Error('No customer!')

		const { url } = await stripe.billingPortal.sessions.create({
			customer,
			return_url: absoluteUrl('/account'),
		})

		return NextResponse.json({ url })
	} catch (error: any) {
		console.error(error)

		return new NextResponse('Internal error', { status: 500 })
	}
}
