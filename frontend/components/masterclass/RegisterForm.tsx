"use client"
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import { CreditCard, Shield } from 'lucide-react'
import { validateCoupon } from '@/lib/coupon'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coupon: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (formData.coupon) {
      const { valid } = await validateCoupon(formData.coupon)
      if (!valid) {
        setFormData({ ...formData, coupon: '' })
        setLoading(false)
        return
      }
    }

    try {
      const res = await fetch('/api/masterclass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.sessionId) {
        const stripe = await stripePromise
        const { error } = await stripe!.redirectToCheckout({ sessionId: data.sessionId })
        if (error) toast.error(error.message || 'Payment failed')
      } else {
        toast.error(data.error || 'Registration failed')
      }
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="mc-register-form" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Secure Your Spot</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />
          {/* Coupon Code */}
          <input
            type="text"
            name="coupon"
            placeholder="Coupon Code (optional)"
            value={formData.coupon}
            onChange={handleChange}
            className="input-field"
          />
          <Button type="submit" size="lg" isLoading={loading} className="w-full">
            <CreditCard size={20} className="mr-2" /> Proceed to Payment
          </Button>
          <p className="text-sm text-gray-600 text-center flex items-center justify-center gap-2">
            <Shield size={16} className="text-green-500" /> Secure payment powered by Stripe
          </p>
        </form>
      </div>
    </section>
  )
}
