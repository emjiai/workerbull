'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Maria Alvarez',
    role: 'Operations Manager',
    content: "Workerbull's generative-AI agents now create and approve purchase orders for us. Manual processing time is down 85%.",
    image: 'https://ui-avatars.com/api/?name=Maria+Alvarez&background=10b981&color=fff',
    rating: 5,
  },
  {
    name: 'James O\'Connor',
    role: 'CIO',
    content: 'The automated email copilot drafts 100+ personalized customer responses daily, our CSAT jumped to 4.9.',
    image: 'https://ui-avatars.com/api/?name=James+O%27Connor&background=f59e0b&color=fff',
    rating: 5,
  },
  {
    name: 'Priya Shah',
    role: 'HR Lead',
    content: 'Our generative-AI onboarding assistant produces bespoke training plans instantly. New hires ramp 40% faster.',
    image: 'https://ui-avatars.com/api/?name=Priya+Shah&background=6366f1&color=fff',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#E8EAE7] via-[#F5F6F8] to-[#C1C8DF]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-white-500 fill-current" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold">
              Success <span className="gradient-text">Stories</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join 100+ businesses who've transformed their AI automation journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-current" />
                ))}
              </div>

              <Quote className="text-gray-300 mb-2" size={24} />
              <p className="text-gray-700 leading-relaxed">
                {testimonial.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full">
            <Star className="fill-current" size={20} />
            <span className="font-semibold">4.9/5 Average Rating from 100+ Professionals</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}