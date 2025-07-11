'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Sparkles, Gift, Bell, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function WaitlistPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'website',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Successfully joined the waitlist!')
        setFormData({ name: '', email: '', phone: '', source: 'website' })
      } else {
        toast.error(data.error || 'Failed to join waitlist')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const benefits = [
    {
      icon: Gift,
      title: '50% Early Bird Discount',
      description: 'Get exclusive access to our lowest price ever',
    },
    {
      icon: Bell,
      title: 'Priority Access',
      description: 'Be the first to know when registration opens',
    },
    {
      icon: Sparkles,
      title: 'Free AI Toolkit',
      description: 'Receive our curated list of 50+ AI tools for startups',
    },
    {
      icon: Clock,
      title: 'Limited Spots',
      description: 'Only 100 seats available for the next cohort',
    },
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
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              <span>Be Among the First</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join the{' '}
              <span className="gradient-text">Exclusive Waitlist</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get notified first when registration opens for our AI Startup Launch course
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Waitlist Benefits</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <benefit.icon className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Reserve Your Spot</h2>
              
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
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How did you hear about us?
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="website">Website</option>
                    <option value="social_media">Social Media</option>
                    <option value="referral">Friend/Referral</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full"
                  size="lg"
                >
                  Join Waitlist
                </Button>

                <p className="text-center text-sm text-gray-600 mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-8 bg-white px-8 py-4 rounded-full shadow-lg">
              <div>
                <div className="text-2xl font-bold text-purple-600">30+</div>
                <div className="text-sm text-gray-600">People on waitlist</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div>
                <div className="text-2xl font-bold text-pink-600">50</div>
                <div className="text-sm text-gray-600">Spots available</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}