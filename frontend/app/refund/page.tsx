'use client'
import { motion } from 'framer-motion'
import { Heart, Shield, Users, Star } from 'lucide-react'

export default function RefundPage() {
  const sections = [
    {
      title: 'Our Commitment to Your Success',
      icon: Heart,
      content: `At WorkerBull, we're deeply committed to providing exceptional value and supporting your Generative AI integration journey. We've invested significant resources into creating a comprehensive course that delivers real, actionable results. Our focus is on your success, and we believe that commitment goes both ways.`
    },
    {
      title: 'Why We Don\'t Offer Traditional Refunds',
      icon: Shield,
      content: `Our course provides immediate access to valuable intellectual property, strategies, and tools that cannot be "returned." Once you've accessed our materials, you've gained knowledge and insights that will benefit you regardless of whether you complete the course. This policy helps us:
      
      • Maintain affordable pricing for all students
      • Invest in continuous course improvements
      • Provide exceptional support and resources
      • Protect our intellectual property
      • Ensure only committed students join our community`
    },
    {
      title: 'What We Offer Instead',
      icon: Star,
      content: `While we don't offer monetary refunds, we're committed to ensuring your satisfaction through:
      
      • Satisfaction Guarantee: If you're not satisfied within the first 30 days, we'll work with you personally to address your concerns
      • Free Consultation: All students receive a complimentary strategy session to maximize their success
      • Extended Access: Lifetime access to all course materials and future updates
      • Flexible Learning: Learn at your own pace with recorded sessions
      • Community Support: Ongoing access to our vibrant student community
      • Direct Mentorship: Regular office hours and Q&A sessions`
    },
    {
      title: 'Making the Right Decision',
      content: `We want you to feel confident in your investment. Before enrolling, we encourage you to:
      
      • Review our detailed curriculum to ensure it aligns with your goals
      • Watch our free preview lessons
      • Attend a free discovery call to ask questions
      • Read testimonials from successful students
      • Consider your commitment level and available time
      
      This course is designed for action-takers who are ready to transform their ideas into reality.`
    },
    {
      title: 'Special Circumstances',
      content: `We understand that life can be unpredictable. In cases of:
      
      • Medical emergencies (with documentation)
      • Technical issues preventing course access
      • Duplicate purchases
      
      Please contact us at info@workerbull.com within 7 days, and we'll work with you to find a fair solution. This may include course credit, transfer to a future cohort, or other accommodations based on the specific situation.`
    },
    {
      title: 'Your Success Is Our Priority',
      icon: Users,
      content: `We measure our success by your success. That's why we:
      
      • Continuously update course content based on student feedback
      • Provide ongoing support even after course completion
      • Offer exclusive opportunities to our alumni
      • Maintain a success rate of over 95% for students who complete the program
      • Feature successful students in our community spotlight
      
      When you invest in our course, you're not just buying content – you're joining a community committed to your growth.`
    }
  ]

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Heart size={16} />
              <span>Your Satisfaction Matters</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Refund{' '}
              <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to your success and satisfaction
            </p>
          </div>

          {/* Policy Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.section
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      {section.icon && (
                        <div className="bg-purple-100 p-2 rounded-lg mt-1">
                          <section.icon className="text-purple-600" size={20} />
                        </div>
                      )}
                      <h2 className="text-2xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </motion.section>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
                <p className="mb-6 text-white/90">
                  Join successful companies who have integrated AI-poweredpowered applications with our proven system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/register"
                    className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Enroll Now
                  </a>
                  <a
                    href="/book"
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 text-center"
                  >
                    Book Free Consultation
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 p-6 bg-purple-50 rounded-lg"
              >
                <p className="text-purple-900 font-medium mb-2">
                  Questions About Our Policy?
                </p>
                <p className="text-purple-700 text-sm">
                  We're here to help! Contact us at support@soosbuilder.com or book a free consultation 
                  to discuss any concerns before enrolling.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Back to Home CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              ← Back to Home
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}