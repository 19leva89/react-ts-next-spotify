import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { Database } from '@/app/types_db'
import { toDateTime } from '@/lib/helpers'
import { Price, Product } from '@/app/types'
import { createClient } from '@/utils/supabase/client'

export const supabase = createClient()

export const upsertProductRecord = async (product: Stripe.Product) => {
	const productData: Product = {
		id: product.id,
		active: product.active,
		name: product.name,
		description: product.description ?? undefined,
		image: product.images?.[0] ?? null,
		metadata: product.metadata,
	}

	const { error } = await supabase.from('products').upsert([productData])

	if (error) throw error

	console.log(`Product Inserted/Updated: ${product.id}`)
}

export const upsertPriceRecord = async (price: Stripe.Price) => {
	const priceData: Price = {
		id: price.id,
		product_id: typeof price.product === 'string' ? price.product : '',
		active: price.active,
		currency: price.currency,
		description: price.nickname ?? undefined,
		type: price.type,
		unit_amount: price.unit_amount ?? undefined,
		interval: price.recurring?.interval,
		interval_count: price.recurring?.interval_count,
		trial_period_days: price.recurring?.trial_period_days,
		metadata: price.metadata,
	}

	const { error } = await supabase.from('prices').upsert([priceData])

	if (error) throw error

	console.log(`Price Inserted/Updated: ${price.id}`)
}

export const createOrRetrieveCustomer = async ({ email, uuid }: { email: string; uuid: string }) => {
	const { data, error } = await supabase
		.from('customers')
		.select('stripe_customer_id')
		.eq('id', uuid)
		.single()

	if (error || !data?.stripe_customer_id) {
		const customerData: { metadata: { supabaseUUID: string }; email?: string } = {
			metadata: {
				supabaseUUID: uuid,
			},
		}

		if (email) customerData.email = email

		const customer = await stripe.customers.create(customerData)

		const { error: supabaseError } = await supabase
			.from('customers')
			.insert([{ id: uuid, stripe_customer_id: customer.id }])

		if (supabaseError) throw supabaseError

		console.log(`New Customer Created and Inserted for ${uuid}.`)

		return customer.id
	}

	return data.stripe_customer_id
}

const copyBillingDetailsToCustomer = async (uuid: string, payment_method: Stripe.PaymentMethod) => {
	//TODO: check this assertion
	const customer = payment_method.customer as string
	const { name, phone, address } = payment_method.billing_details

	if (!name || !phone || !address) return

	//@ts-expect-error [Stripe typing issue]
	await stripe.customers.update(customer, { name, phone, address })

	const { error } = await supabase
		.from('users')
		.update({
			billing_address: { ...address },
			payment_method: { ...payment_method[payment_method.type] },
		})
		.eq('id', uuid)

	if (error) throw error
}

export const manageSubscriptionStatusChange = async (
	subscriptionId: string,
	customerId: string,
	createAction = false,
) => {
	// Get customer's UUID from mapping table
	const { data: customerData, error: noCustomerError } = await supabase
		.from('customers')
		.select('id')
		.eq('stripe_customer_id', customerId)
		.single()

	if (noCustomerError) throw noCustomerError

	const { id: uuid } = customerData!

	const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
		expand: ['default_payment_method'],
	})

	// Upsert the latest status of the subscription object.
	const subscriptionData: Database['public']['Tables']['subscriptions']['Insert'] = {
		id: subscription.id,
		user_id: uuid,
		metadata: subscription.metadata,
		// @ts-expect-error [Stripe typing issue]
		status: subscription.status,
		price_id: subscription.items.data[0].price.id,
		//TODO: check quantity on subscription
		// @ts-expect-error [Stripe typing issue]
		quantity: subscription.quantity,
		cancel_at_period_end: subscription.cancel_at_period_end,
		cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
		canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString() : null,
		current_period_start: toDateTime(subscription.items.data[0]?.current_period_start).toISOString(),
		current_period_end: toDateTime(subscription.items.data[0]?.current_period_end).toISOString(),
		created: toDateTime(subscription.created).toISOString(),
		ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
		trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
		trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null,
	}

	const { error } = await supabase.from('subscriptions').upsert([subscriptionData])

	if (error) throw error
	console.log(`Inserted/Updated Subscription [${subscription.id}] for User [${uuid}]`)

	// For a new subscription copy the billing details to the customer object.
	// NOTE: This is a costly operation and should happen at the very end.
	if (createAction && subscription.default_payment_method && uuid)
		await copyBillingDetailsToCustomer(uuid, subscription.default_payment_method as Stripe.PaymentMethod)
}
