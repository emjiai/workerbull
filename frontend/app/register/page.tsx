'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'
import { CreditCard, Shield, Clock, Users, CheckCircle, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import { validateCoupon } from '@/lib/coupon'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coupon: '',
  })

  const coursePrice = 497
  const originalPrice = 997

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate coupon if provided
    if (formData.coupon) {
      const { valid } = await validateCoupon(formData.coupon)
      if (!valid) {
        setFormData({ ...formData, coupon: '' })
        setLoading(false)
        return
      }
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.sessionId) {
        const stripe = await stripePromise
        const { error } = await stripe!.redirectToCheckout({
          sessionId: data.sessionId,
        })

        if (error) {
          toast.error(error.message || 'Payment failed')
        }
      } else {
        toast.error(data.error || 'Registration failed')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const courseIncludes = [
    '6 weeks of intensive training',
    'Live sessions every Tuesday & Thursday',
    'Lifetime access to all materials',
    'Private Slack community',
    'Weekly office hours with mentors',
    '50+ AI tools and templates',
    'Certificate of completion',
  ]

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star size={16} />
              <span>100+ Happy Students</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Register for the{' '}
              <span className="gradient-text">AI Startup Course</span>
            </h1>
            <p className="text-xl text-gray-600">
              Transform your startup journey with AI-powered strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* What's Included */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">What's Included</h2>
                
                <div className="space-y-3">
                  {courseIncludes.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="text-green-500 mt-0.5" size={20} />
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Clock className="text-purple-600 mx-auto mb-2" size={32} />
                    <div className="text-xl font-bold">40+</div>
                    <div className="text-sm text-gray-600">Hours Content</div>
                  </div>
                  <div>
                    <Users className="text-pink-600 mx-auto mb-2" size={32} />
                    <div className="text-xl font-bold">100+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  {/* <div>
                    <Shield className="text-purple-600 mx-auto mb-2" size={32} />
                    <div className="text-xl font-bold">30-Day</div>
                    <div className="text-sm text-gray-600">Guarantee</div>
                  </div> */}
                </div>
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-3 mb-2">
                  <span className="text-4xl font-bold">{formatCurrency(coursePrice)}</span>
                  <span className="text-xl text-gray-500 line-through">{formatCurrency(originalPrice)}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  <span>Save {formatCurrency(originalPrice - coursePrice)}</span>
                  <span className="font-semibold">50% OFF</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">Secure Your Spot</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coupon Code (optional)
                  </label>
                  <input
                    type="text"
                    name="coupon"
                    value={formData.coupon}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="ENTER10"
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full"
                  size="lg"
                >
                  <CreditCard size={20} className="mr-2" />
                  Proceed to Payment
                </Button>

                <div className="text-center space-y-2 mt-6">
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                    <Shield size={16} className="text-green-500" />
                    Secure payment powered by Stripe
                  </p>
                  {/* <p className="text-sm text-gray-600">
                    30-day money-back guarantee
                  </p> */}
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}