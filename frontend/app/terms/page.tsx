'use client'
import { motion } from 'framer-motion'
import { Shield, FileText } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using the AI Startup Launch course platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this Service.`
    },
    {
      title: '2. Course Enrollment and Access',
      content: `Upon successful payment, you will receive access to the AI Startup Launch course materials. This access is granted to you personally and is non-transferable. Sharing your account credentials or course materials with others is strictly prohibited and may result in immediate termination of access without refund.`
    },
    {
      title: '3. Payment Terms',
      content: `All payments are processed securely through Stripe. The course fee is due in full at the time of enrollment. We currently offer a one-time payment option. Payment plans may be available upon request. All prices are in USD and are subject to change without notice, though any changes will not affect already enrolled students.`
    },
    {
      title: '4. Intellectual Property',
      content: `All course materials, including but not limited to videos, documents, templates, and tools, are the intellectual property of AI Startup Launch and are protected by copyright laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any of our content without our express written permission.`
    },
    {
      title: '5. Student Conduct',
      content: `As a student, you agree to:
      • Participate respectfully in all course activities
      • Not share or distribute course materials outside the platform
      • Not engage in any form of harassment or inappropriate behavior
      • Respect the privacy and intellectual property of other students
      • Use the knowledge gained ethically and legally`
    },
    {
      title: '6. Disclaimers',
      content: `While we strive to provide valuable and accurate information, the AI Startup Launch course is for educational purposes only. We make no guarantees about your individual success or income potential. Your results will depend on many factors including but not limited to your background, dedication, desire, and motivation.`
    },
    {
      title: '7. Limitation of Liability',
      content: `To the fullest extent permitted by law, AI Startup Launch shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.`
    },
    {
      title: '8. Privacy and Data Protection',
      content: `We take your privacy seriously. Any personal information collected will be used solely for providing our services and improving your experience. We will not sell or share your personal information with third parties without your consent, except as required by law. For more details, please refer to our Privacy Policy.`
    },
    {
      title: '9. Modifications to Terms',
      content: `We reserve the right to modify these terms at any time. We will notify enrolled students of any significant changes via email. Your continued use of the Service after such modifications will constitute your acknowledgment and agreement to the modified terms.`
    },
    {
      title: '10. Termination',
      content: `We reserve the right to terminate or suspend your account and access to the course at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.`
    },
    {
      title: '11. Governing Law',
      content: `These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these terms will be resolved through binding arbitration.`
    },
    {
      title: '12. Contact Information',
      content: `If you have any questions about these Terms of Service, please contact us at:
      
      Email: legal@soosbuilder.com
      Address: AI Startup Launch, Legal Department
      
      By enrolling in our course, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.`
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
              <Shield size={16} />
              <span>Legal Agreement</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of{' '}
              <span className="gradient-text">Service</span>
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Terms Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Welcome to AI Startup Launch. These terms of service ("Terms") govern your use of our website and course platform. 
                By accessing or using our Service, you agree to be bound by these Terms.
              </p>

              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.section
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </motion.section>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 p-6 bg-purple-50 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <FileText className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-purple-900 font-medium mb-2">
                      Agreement Acknowledgment
                    </p>
                    <p className="text-purple-700 text-sm">
                      By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service 
                      and our Privacy Policy.
                    </p>
                  </div>
                </div>
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