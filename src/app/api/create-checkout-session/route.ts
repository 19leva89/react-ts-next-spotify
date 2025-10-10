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
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: price.id,
					quantity,
				},
			],
			billing_address_collection: 'auto',
			customer,
			allow_promotion_codes: true,
			subscription_data: {
				metadata,
			},
			success_url: accountUrl,
			cancel_url: homeUrl,
		})

		return NextResponse.json({ url: session.url })
	} catch (error) {
		console.error('Checkout session creation failed:', error)

		return new NextResponse('Internal error', { status: 500 })
	}
}
