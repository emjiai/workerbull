'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, CheckCircle } from 'lucide-react'

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const preparationTips = [
    'Write down your key questions or challenges',
    'Have any relevant documents ready to share',
    'Test your camera and microphone',
    'Find a quiet space with good internet',
  ]

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2 
            }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
              <Calendar className="text-green-600" size={48} />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Consultation{' '}
              <span className="gradient-text">Booked!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're looking forward to speaking with you
            </p>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg mb-12"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="text-purple-600" size={32} />
                </div>
                <h3 className="font-semibold">Meeting Link</h3>
                <p className="text-sm text-gray-600">Sent 1 hour before</p>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="text-pink-600" size={32} />
                </div>
                <h3 className="font-semibold">Video Call</h3>
                <p className="text-sm text-gray-600">Via Google Meet</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="text-blue-600" size={32} />
                </div>
                <h3 className="font-semibold">Calendar Invite</h3>
                <p className="text-sm text-gray-600">Check your email</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">How to Prepare</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {preparationTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 mt-0.5" size={16} />
                    <span className="text-sm text-gray-600">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <p className="text-gray-600 mb-6">
              Need to reschedule? Contact us at least 24 hours in advance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="btn-primary"
              >
                Return to Home
              </Link>
              <a
                href="mailto:info@soosbuilder.com"
                className="btn-secondary"
              >
                Contact Support
              </a>
            </div>
          </motion.div>

          {/* Reference Number */}
          {sessionId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-sm text-gray-500"
            >
              Booking Reference: {sessionId.slice(0, 8)}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}