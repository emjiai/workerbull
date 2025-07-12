'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CheckCircle } from 'lucide-react'

const faqTopics = [
  {
    title: 'AI Literacy for Business Leaders',
    points: [
      'The Rise of Generative AI and What It Means for Business',
      'Delegation: Strategic Task Distribution',
      'Description: Communicating for Clarity',
      'Discernment: The Critical Eye',
      'Diligence: Responsible and Ethical Use',
    ],
  },
  {
    title: 'AI for Strategic Decision Making',
    points: [
      'Discover practical applications of Generative AI across industries.',
      'Use Generative AI for brainstorming and reflective thinking to develop strategic AI initiatives',
      'Step-by-step approach to formulate strategic Generative AI business applications that drive innovation in your organization',
    ],
  },
  {
    title: 'AI Implementation Frameworks',
    points: [
      'Explore frameworks for integrating Generative AI into existing systems. AI Automation, AI Augmentation, AI Agency',
    ],
  },
  {
    title: 'AI Ethics and Governance',
    points: [
      'Evaluate ethical implications and considerations when implementing Generative AI solutions.',
      'AI Governance, Trust, and Transparency',
    ],
  },
  {
    title: 'AI Product Development for Non-Technical Leaders',
    points: [
      'Prompt Engineering for Leadership',
      'No Code Tools for Product Development',
      'Building Executive AI Assistants',
    ],
  },
  {
    title: 'Future Trends of AI in Business: The Future of Work',
    points: [
      'Spot the latest AI trends and build a business strategy that stands the test of time',
      'Stay informed about future trends and innovations in the field of Generative AI '
    ],
  },
]

export default function TopicsSection() {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpen((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          AI For Business Leaders
        </motion.h2>

        <ul className="space-y-4">
          {faqTopics.map((item, idx) => (
            <li key={item.title} className="bg-white rounded-xl shadow">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 focus:outline-none"
              >
                <span className="text-left font-medium">{item.title}</span>
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    open === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden px-6 pb-4 space-y-2"
                  >
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <CheckCircle className="text-green-500 mt-1" size={18} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
