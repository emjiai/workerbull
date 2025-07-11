'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Mail, Phone, MessageSquare, Send, MapPin, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        toast.error(data.error || 'Failed to send message')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@workerbull.com',
      link: 'mailto:info@workerbull.com',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      content: 'Available Mon-Fri',
      subtext: '9 AM - 5 PM GMT',
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: 'Within 24 hours',
      subtext: 'Business days only',
    },
  ]

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <MessageSquare size={16} />
              <span>We're Here to Help</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in{' '}
              <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about the course? Need assistance? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
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
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full"
                  size="lg"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Quick Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Quick Contact</h2>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <item.icon className="text-purple-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-purple-600 hover:text-purple-700 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600">{item.content}</p>
                        )}
                        {item.subtext && (
                          <p className="text-sm text-gray-500 mt-1">{item.subtext}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-r from-[#28264C] via-[#4E5174] to-[#EBBFD0] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM GMT</p>
                  <p>Saturday: 10:00 AM - 2:00 PM GMT</p>
                  <p>Sunday: Closed</p>
                </div>
                <p className="mt-4 text-white/80 text-sm">
                  * Response times may vary during high volume periods
                </p>
              </div>

              {/* Emergency Support */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-gray-600 mb-4">
                  For urgent course-related issues, current students can reach out via:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Discord community (fastest response)</li>
                  <li>• Direct message to course mentors</li>
                  <li>• Emergency email: urgent@soosbuilder.com</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}