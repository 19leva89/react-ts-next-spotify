import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

import {
	upsertProductRecord,
	upsertPriceRecord,
	manageSubscriptionStatusChange,
} from '@/utils/supabase/admin'
import { stripe } from '@/lib/stripe'

const relevantEvents = new Set([
	'product.created',
	'product.updated',
	'price.created',
	'price.updated',
	'checkout.session.completed',
	'customer.subscription.created',
	'customer.subscription.updated',
	'customer.subscription.deleted',
])

export async function POST(request: NextRequest) {
	const body = await request.text()
	const signature = request.headers.get('stripe-signature')!
	const secret = process.env.STRIPE_WEBHOOK_SECRET!

	let event: Stripe.Event

	try {
		if (!signature || !secret) return

		event = stripe.webhooks.constructEvent(body, signature, secret)
	} catch (err: any) {
		const error = err instanceof Error ? err : new Error('Unknown error')

		console.error('❌ Webhook error:', error.message)

		return new NextResponse(`Webhook error: ${error.message}`, { status: 400 })
	}

	if (relevantEvents.has(event.type)) {
		try {
			switch (event.type) {
				case 'product.created':
				case 'product.updated':
					await upsertProductRecord(event.data.object as Stripe.Product)
					break
				case 'price.created':
				case 'price.updated':
					await upsertPriceRecord(event.data.object as Stripe.Price)
					break
				case 'customer.subscription.created':
				case 'customer.subscription.updated':
				case 'customer.subscription.deleted':
					const subscription = event.data.object as Stripe.Subscription
					await manageSubscriptionStatusChange(
						subscription.id,
						subscription.customer as string,
						event.type === 'customer.subscription.created',
					)
					break
				case 'checkout.session.completed':
					const checkoutSession = event.data.object as Stripe.Checkout.Session
					if (checkoutSession.mode === 'subscription') {
						const subscriptionId = checkoutSession.subscription
						await manageSubscriptionStatusChange(
							subscriptionId as string,
							checkoutSession.customer as string,
							true,
						)
					}
					break
				default:
					throw new Error('Unhandled relevant event!')
			}
		} catch (error) {
			console.error('❌ Webhook processing error:', error)

			return new NextResponse('Internal Server Error', { status: 500 })
		}
	}

	return NextResponse.json({ received: true }, { status: 200 })
}
