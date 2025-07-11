'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'
import { Calendar, Clock, MessageSquare, CreditCard } from 'lucide-react'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import { validateCoupon } from '@/lib/coupon'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function BookPage() {
  const [loading, setLoading] = useState(false)
  const [consultationType, setConsultationType] = useState<'free' | 'paid'>('free')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coupon: '',
    date: '',
    time: '',
    duration: '30 minutes',
    topic: '',
    description: '',
  })

  const consultationPrices = {
    '30 minutes': 97,
    '60 minutes': 197,
    '90 minutes': 297,
  }

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  ]

  const topics = [
    'AI Tool Selection Strategy',
    'MVP Development with AI',
    'Growth Hacking & Marketing',
    'Fundraising Strategy',
    'Product-Market Fit',
    'Team Building & Hiring',
    'Other (please specify)',
  ]

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
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          consultationType,
        }),
      })

      const data = await response.json()

      if (consultationType === 'paid' && data.sessionId) {
        const stripe = await stripePromise
        const { error } = await stripe!.redirectToCheckout({
          sessionId: data.sessionId,
        })

        if (error) {
          toast.error(error.message || 'Payment failed')
        }
      } else if (response.ok) {
        toast.success('Consultation booked successfully!')
        setFormData({
          name: '',
          email: '',
          phone: '',
          coupon: '',
          date: '',
          time: '',
          duration: '30 minutes',
          topic: '',
          description: '',
        })
      } else {
        toast.error(data.error || 'Booking failed')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book a{' '}
              <span className="gradient-text">Consultation</span>
            </h1>
            <p className="text-xl text-gray-600">
              Get personalized guidance for your AI-powered startup journey
            </p>
          </div>

          {/* Consultation Type Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <button
                onClick={() => setConsultationType('free')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  consultationType === 'free'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Free Discovery Call (15 min)
              </button>
              <button
                onClick={() => setConsultationType('paid')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  consultationType === 'paid'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Strategy Session (Paid)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {consultationType === 'free' ? (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Free Discovery Call</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="text-purple-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold">15-minute call</h3>
                        <p className="text-gray-600">Quick assessment of your needs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare className="text-purple-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold">Q&A Session</h3>
                        <p className="text-gray-600">Ask questions about the course</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="text-purple-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold">Personalized Advice</h3>
                        <p className="text-gray-600">Get tailored recommendations</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Strategy Session</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="text-purple-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold">30/60/90 minutes</h3>
                        <p className="text-gray-600">Deep dive into your challenges</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare className="text-purple-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold">Action Plan</h3>
                        <p className="text-gray-600">Leave with clear next steps</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="text-purple-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold">Follow-up Support</h3>
                        <p className="text-gray-600">Email support for 7 days</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pricing */}
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Session Pricing:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>30 minutes: {formatCurrency(consultationPrices['30 minutes'])}</li>
                      <li>60 minutes: {formatCurrency(consultationPrices['60 minutes'])}</li>
                      <li>90 minutes: {formatCurrency(consultationPrices['90 minutes'])}</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Book Your Session</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={minDate}
                      value={formData.date}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time *
                    </label>
                    <select
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select time</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {consultationType === 'paid' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Duration *
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="30 minutes">30 minutes - {formatCurrency(consultationPrices['30 minutes'])}</option>
                      <option value="60 minutes">60 minutes - {formatCurrency(consultationPrices['60 minutes'])}</option>
                      <option value="90 minutes">90 minutes - {formatCurrency(consultationPrices['90 minutes'])}</option>
                    </select>
                  </div>
                )}

                {consultationType === 'paid' && (
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
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic *
                  </label>
                  <select
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select topic</option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="input-field"
                    placeholder="Tell us more about what you'd like to discuss..."
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full"
                  size="lg"
                >
                  {consultationType === 'paid' ? (
                    <>
                      <CreditCard size={20} className="mr-2" />
                      Book & Pay
                    </>
                  ) : (
                    'Book Free Call'
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}