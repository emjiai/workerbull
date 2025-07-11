'use client'
import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    category: 'Course Information',
    questions: [
      {
        question: 'What is included in the "Launch Startup 10x Faster with AI" course?',
        answer: 'The course includes 6 weeks of intensive training with live sessions twice a week, lifetime access to all materials, a private Discord community, weekly office hours with mentors, 50+ AI tools and templates, hands-on projects, and a certificate of completion.'
      },
      {
        question: 'How long is the course?',
        answer: 'The course runs for 6 weeks with live sessions on Tuesdays and Thursdays at 7 PM EST. Each week includes approximately 4-5 hours of live instruction plus self-paced assignments.'
      },
      {
        question: 'Do I need prior coding experience?',
        answer: 'No coding experience is required! This course focuses on no-code and AI-powered tools that allow you to build and launch startups without traditional programming skills.'
      },
      {
        question: 'What if I miss a live session?',
        answer: 'All live sessions are recorded and made available within 24 hours. You have lifetime access to all recordings, so you can watch them at your convenience.'
      }
    ]
  },
  {
    category: 'Payment & Enrollment',
    questions: [
      {
        question: 'How much does the course cost?',
        answer: 'The course is currently available for $497 (50% off the regular price of $997) as part of our early bird special. This is a one-time payment with no hidden fees.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, and payments through Stripe. Payment plans may be available upon request.'
      },
      {
        question: 'Is there a money-back guarantee?',
        answer: 'We offer a 100% satisfaction guarantee. If you\'re not completely satisfied with the course within the first 30 days, we\'ll work with you to ensure you get the value you expected.'
      },
      {
        question: 'When does the next cohort start?',
        answer: 'New cohorts start on the first Monday of each month. Check our registration page for the next available start date.'
      }
    ]
  },
  {
    category: 'Technical Requirements',
    questions: [
      {
        question: 'What equipment do I need?',
        answer: 'You\'ll need a computer (laptop or desktop) with internet connection, a webcam and microphone for live sessions, and a Google account for accessing various AI tools.'
      },
      {
        question: 'Which AI tools will we use?',
        answer: 'We\'ll use tools including ChatGPT, Claude, Midjourney, Bubble, Webflow, Zapier, Make.com, and many others. Most offer free tiers that are sufficient for the course.'
      },
      {
        question: 'Do I need to pay for AI tools separately?',
        answer: 'While the course fee doesn\'t include AI tool subscriptions, we\'ll show you how to maximize free tiers. Most students complete the course spending less than $50 on optional tool upgrades.'
      }
    ]
  },
  {
    category: 'Support & Community',
    questions: [
      {
        question: 'What kind of support is available?',
        answer: 'You\'ll have access to weekly office hours, a private Discord community, direct mentor feedback on projects, and email support throughout the course and for 30 days after completion.'
      },
      {
        question: 'Can I get 1-on-1 consultations?',
        answer: 'Yes! All students get one free 15-minute consultation. Additional paid consultations are available at discounted rates for students.'
      },
      {
        question: 'Is there a community after the course?',
        answer: 'Absolutely! You\'ll have lifetime access to our alumni Discord community where you can network, share wins, get feedback, and access exclusive opportunities.'
      }
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

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
              <HelpCircle size={16} />
              <span>Got Questions? We've Got Answers</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about the AI Startup Launch course
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-purple-600">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((item, index) => {
                    const itemId = `${categoryIndex}-${index}`
                    const isOpen = openItems.includes(itemId)
                    
                    return (
                      <div
                        key={itemId}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`flex-shrink-0 text-gray-500 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            size={20}
                          />
                        </button>
                        
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                          >
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="mb-6 text-white/90">
              Our team is here to help! Reach out for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Contact Us
              </a>
              <a
                href="/book"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Book Free Consultation
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}