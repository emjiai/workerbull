'use client'
import { motion } from 'framer-motion'
import { Lock, Eye, Shield, UserCheck } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      icon: Eye,
      content: `We collect information you provide directly to us, including:
      
      • Personal Information: Name, email address, phone number, and billing information
      • Course Data: Your progress, assignments, and interactions within the course
      • Communication Data: Messages you send us and feedback you provide
      • Technical Data: IP address, browser type, device information, and usage patterns
      
      We collect this information when you register, enroll in our course, contact us, or interact with our platform.`
    },
    {
      title: '2. How We Use Your Information',
      icon: UserCheck,
      content: `We use the information we collect to:
      
      • Provide and maintain our course platform
      • Process your payments and send you transaction confirmations
      • Send you course materials and important updates
      • Respond to your comments, questions, and requests
      • Monitor and analyze usage patterns to improve our services
      • Protect against fraudulent or illegal activity
      • Comply with legal obligations`
    },
    {
      title: '3. Information Sharing',
      icon: Shield,
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following situations:
      
      • With service providers who assist in our operations (e.g., Stripe for payments, email services)
      • To comply with legal obligations or respond to lawful requests
      • To protect our rights, privacy, safety, or property
      • With your explicit consent
      
      All third-party service providers are required to maintain the confidentiality of your information.`
    },
    {
      title: '4. Data Security',
      icon: Lock,
      content: `We implement appropriate technical and organizational measures to protect your personal information, including:
      
      • Encryption of sensitive data in transit and at rest
      • Regular security assessments and updates
      • Limited access to personal information on a need-to-know basis
      • Secure payment processing through Stripe
      
      However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      title: '5. Your Rights and Choices',
      content: `You have the following rights regarding your personal information:
      
      • Access: Request a copy of the personal information we hold about you
      • Correction: Request correction of inaccurate or incomplete information
      • Deletion: Request deletion of your personal information (subject to legal requirements)
      • Opt-out: Unsubscribe from marketing communications at any time
      • Data Portability: Request your data in a structured, machine-readable format
      
      To exercise these rights, please contact us at info@workerbull.com.`
    },
    {
      title: '6. Cookies and Tracking',
      content: `We use cookies and similar tracking technologies to:
      
      • Keep you logged in to your account
      • Remember your preferences
      • Analyze site traffic and usage
      • Improve our services
      
      You can control cookies through your browser settings, but disabling them may limit your ability to use certain features of our platform.`
    },
    {
      title: '7. Third-Party Links',
      content: `Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.`
    },
    {
      title: '8. Children\'s Privacy',
      content: `Our services are not directed to individuals under 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us immediately.`
    },
    {
      title: '9. International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from your country. By using our services, you consent to such transfers.`
    },
    {
      title: '10. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.`
    },
    {
      title: '11. Contact Us',
      content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
      
      Email: info@workerbull.com
      Data Protection Officer: info@workerbull.com
      
      We aim to respond to all privacy inquiries within 48 hours.`
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
              <Lock size={16} />
              <span>Your Data, Protected</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy{' '}
              <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Privacy Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                At WorkerBull, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you use our course platform and services.
              </p>

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
                transition={{ delay: 1 }}
                className="mt-12 p-6 bg-purple-50 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Shield className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-purple-900 font-medium mb-2">
                      Our Commitment to You
                    </p>
                    <p className="text-purple-700 text-sm">
                      We are committed to protecting your privacy and ensuring the security of your personal information. 
                      If you have any questions or concerns, please don't hesitate to contact us.
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