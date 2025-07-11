'use client'
import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    category: 'Program Information',
    questions: [
      {
        question:
          'What is the "Generative AI for Business & Workplace Automation" program?',
        answer:
          'This 4-week live cohort shows professionals how to identify, design, and deploy generative-AI automations that create measurable business value across functions such as marketing, operations, finance, and HR.',
      },
      {
        question: 'How is the program structured?',
        answer:
          'You will attend two live workshops each week (≈2 hrs each) and complete hands-on labs between sessions. Plan for roughly 4–5 hours per week in total.',
      },
      {
        question: 'Do I need any coding background?',
        answer:
          'No coding is required. All automations are built with no-code tools and pre-trained large-language-model APIs. Basic spreadsheet skills are enough.',
      },
      {
        question: 'What if I cannot attend a live session?',
        answer:
          'All sessions are recorded and posted within 24 hours. You have lifetime access to recordings, templates, and updates.',
      },
    ],
  },
  {
    category: 'Enrollment & Payment',
    questions: [
      {
        question: 'What does the tuition cover?',
        answer:
          'The $497 tuition includes live instruction, lifetime access to recordings & templates, private community, and post-program implementation office hours.',
      },
      {
        question: 'Can my company pay via invoice or purchase order?',
        answer:
          'Yes. We can issue invoices to comply with procurement requirements. Team discounts are available for groups of three or more.',
      },
      {
        question: 'When does the next cohort start?',
        answer:
          'A new cohort begins every four weeks. The exact date is displayed on our registration page.',
      },
    ],
  },
  {
    category: 'Tools & Technical',
    questions: [
      {
        question: 'Which AI and automation tools will I learn?',
        answer:
          'We work with ChatGPT / OpenAI, Microsoft Copilot, Google Workspace AI, Zapier, Make, and several no-code agent orchestration platforms. You will also learn evaluation frameworks to swap in alternatives.',
      },
      {
        question: 'Do I need a high-spec computer?',
        answer:
          'Any modern laptop with a Chrome-based browser and stable internet connection is sufficient.',
      },
      {
        question: 'Will I need to purchase paid AI subscriptions?',
        answer:
          'Most tools have generous free tiers. Optional paid upgrades (~$20–$50) can enhance certain labs but are not mandatory.',
      },
    ],
  },
  {
    category: 'Outcomes & Support',
    questions: [
      {
        question: 'What will I have by the end of the program?',
        answer:
          'You will leave with at least one production-ready AI automation, an ROI model tailored to your organization, and a roadmap for scaling automation initiatives.',
      },
      {
        question: 'Is there ongoing support after the program?',
        answer:
          'Graduates enjoy lifetime access to our private community, weekly office hours, and continually updated templates.',
      },
      {
        question: 'Do I receive a certificate of completion?',
        answer:
          'Yes. A verifiable digital certificate is issued once you successfully complete the program.',
      },
    ],
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
    <div className="min-h-screen py-20 bg-gradient-to-br from-[#E8EAE7] via-[#F5F6F8] to-[#C1C8DF]">
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
              className="inline-flex items-center gap-2 bg-[#E8EAE7] text-[#28264C] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <HelpCircle size={16} />
              <span>Got Questions? We've Got Answers</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about the Generative AI for Business and Workplace Automation course
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
                <h2 className="text-2xl font-bold mb-6 text-[#28264C]">
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
            className="mt-12 text-center bg-gradient-to-r from-[#28264C] via-[#4E5174] to-[#A40033] rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="mb-6 text-white/90">
              Our team is here to help! Reach out for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-[#28264C] px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
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