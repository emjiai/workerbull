'use client'

import { motion } from 'framer-motion'

const tools = ['Loveable AI', 'Base44', 'Bolt AI', 'Replit']

export default function ToolsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          Generative AI Tools
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 font-semibold text-purple-700 shadow"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
