import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const getStripeJs = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  if (!publishableKey) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
  }
  return publishableKey
}

// Helper function to format amount for Stripe (converts dollars to cents)
export const formatAmountForStripe = (amount: number) => {
  return Math.round(amount * 100)
}

// Helper function to format amount from Stripe (converts cents to dollars)
export const formatAmountFromStripe = (amount: number) => {
  return amount / 100
}