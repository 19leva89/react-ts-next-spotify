import StripeServer from 'stripe'

export const stripe = new StripeServer(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2025-09-30.clover',
	typescript: true,
})
