import { NextRequest, NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/helpers'
import { createClient } from '@/utils/supabase/server'
import { createOrRetrieveCustomer } from '@/utils/supabase/admin'

const homeUrl = absoluteUrl('/')
const accountUrl = absoluteUrl('/account')

export async function POST(request: NextRequest) {
	const { price, quantity = 1, metadata = {} } = await request.json()

	try {
		const supabase = await createClient()

		const {
			data: { user },
		} = await supabase.auth.getUser()

		const customer = await createOrRetrieveCustomer({
			uuid: user?.id || '',
			email: user?.email || '',
		})

		const session = await stripe.checkout.sessions.create({
			success_url: accountUrl,
			cancel_url: homeUrl,
			payment_method_types: ['card'],
			mode: 'subscription',
			billing_address_collection: 'auto',
			customer,
			line_items: [
				{
					price: price.id,
					quantity,
				},
			],
			allow_promotion_codes: true,
			subscription_data: {
				metadata,
			},
		})

		return NextResponse.json({ sessionId: session.id })
	} catch (error: any) {
		console.error(error)

		return new NextResponse('Internal error', { status: 500 })
	}
}
