'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const topics = [
  'Basics of Product Development for Beginners',
  'How to Build a Product Roadmap + Problem Statement',
  'Prompt Engineering for Building Apps',
  'Basics of Product Building',
  'Front-End Development',
  'Back-End Development',
  'Mobile App Development',
]

export default function TopicsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          What You Will Learn
        </motion.h2>
        <ul className="space-y-4">
          {topics.map((topic, i) => (
            <motion.li
              key={topic}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 bg-white p-4 rounded-xl shadow"
            >
              <CheckCircle className="text-green-500 mt-1" size={20} />
              <span>{topic}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
